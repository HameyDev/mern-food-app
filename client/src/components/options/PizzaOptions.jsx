const PizzaOptions = ({
  sizes = [],
  selectedSize,
  setSelectedSize,
  addons = [],
  selectedAddons = [],
  onAddonChange
}) => {
  return (
    <div>
      <h4 className="font-bold mb-2">Select Size</h4>
      {sizes.map((size, idx) => (
        <label key={idx} className="block">
          <input
            type="radio"
            name="size"
            value={size.label}
            checked={selectedSize?.label === size.label}
            onChange={() => setSelectedSize(size)}
          />
          {size.label} (+Rs. {size.price})
        </label>
      ))}

      {addons.length > 0 && (
        <>
          <h4 className="font-bold mt-4 mb-2">Add-ons</h4>
          {addons.map((addon, idx) => (
            <label key={idx} className="block">
              <input
                type="checkbox"
                name="addons"
                checked={selectedAddons.some(a => a.label === addon.label)}
                onChange={(e) => onAddonChange(e, addon)}
              />
              {addon.label} (+Rs. {addon.price})
            </label>
          ))}
        </>
      )}
    </div>
  );
};

export default PizzaOptions;
