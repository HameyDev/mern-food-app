const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const category = req.query.category;
    let products;

    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }
   
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json( { message: "Server Error", error: err.message  });
  }
};

exports.getSingleProduct = async ( req, res ) => {
  try {
    const product = await Product.findById(req.params.id);

    if(!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json( { message: "Server error", error: err.message } );
  }
};

exports.createProduct = async () => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Prduct creation failed", error: err.message });
  }
};