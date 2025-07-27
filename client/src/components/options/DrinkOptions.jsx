const DrinkOptions = ({ sizes = [], selectedSize, setSelectedSize }) => {
  return (
    <div>
      <h4 className="font-bold mb-2">Choose Drink Size</h4>
      {sizes.map((size, idx) => (
        <label key={idx} className="block">
          <input
            type="radio"
            name="drinkSize"
            value={size.label}
            checked={selectedSize?.label === size.label}
            onChange={() => setSelectedSize(size)}
          />
          {size.label} (+Rs. {size.price})
        </label>
      ))}
    </div>
  );
};

export default DrinkOptions;
