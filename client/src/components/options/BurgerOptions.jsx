const BurgerOptions = ({ addons = [], selectedAddons = [], onAddonChange }) => {
  return (
    <div>
      {addons.length > 0 && (
        <>
          <h4 className="font-bold mb-2">Add-ons</h4>
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

export default BurgerOptions;
