const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpStore = require("../utils/otpStore");
const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;


exports.register = async (req, res) => {
  const { name, phone, password } = req.body;
  try {
    const existing = await User.findOne( { phone } );

    if (existing) return res.status(400).json({ message: "Phone Already Registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User( { name, phone, password: hashedPassword } );
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET,{ expiresIn: "7d" });
    
    res.status(201).json({ token, user : { id: savedUser._id, name: savedUser.name, phone: savedUser.phone, role: savedUser.role }});
  } catch (err) {
    res.status(500).json({ message: "Registration Failed", error: err.message });
  }
};

exports.login = async ( req, res ) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: "Invalid Phone or Password" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Phone or Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, user: { id: user._id, name: user.name, phone: user.phone, role: user.role }});
  } catch (err) {
    res.status(500).json({ message: "Login Failed", error: err.message });
  }
};

 // or require("../utils/otpStore") if stored elsewhere

exports.sendOtp = async (req, res) => {
  console.log("✅ sendOtp endpoint HIT");

  const { phone } = req.body;

  if (!/^\d{11}$/.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = { code: otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  try {
    const formattedPhone = "+92" + phone.slice(1); // Format 0313xxxxxxx to +92313xxxxxxx

    await twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioPhone,
      to: formattedPhone
    });

    console.log(`📲 OTP for ${phone} sent via Twilio: ${otp}`);

    return res.status(200).json({ message: "OTP sent to phone!" });
  } catch (error) {
    console.error("❌ Twilio Error:", error.message);
    return res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};


exports.verifyOtpAndRegister = async (req, res) => {
  const { name, phone, password, otp } = req.body;

  const stored = otpStore[phone];
  if (!stored || stored.code !== otp || Date.now() > stored.expiresAt) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  delete otpStore[phone]; // Clear used OTP

  try {
    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ message: "Phone Already Registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, phone, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        phone: savedUser.phone,
        role: savedUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

