import React from "react";

const DealOptions = ({
  dealOptions,
  selectedBurger,
  setSelectedBurger,
  selectedPizza,
  setSelectedPizza,
  selectedFries,
  setSelectedFries,
  selectedDrink,
  setSelectedDrink,
  addons,
  selectedAddons,
  onAddonChange,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Deal Options</h3>

      {/* Pizza */}
      {dealOptions?.pizzas?.length > 0 && (
        <div className="mb-3">
          <label className="block mb-1">Select Pizza:</label>
          <select
            value={selectedPizza}
            onChange={(e) => setSelectedPizza(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">-- Choose Pizza --</option>
            {dealOptions.pizzas.map((pizza) => (
              <option key={pizza} value={pizza}>
                {pizza}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Burger */}
      {dealOptions?.burgers?.length > 0 && (
        <div className="mb-3">
          <label className="block mb-1">Select Burger:</label>
          <select
            value={selectedBurger}
            onChange={(e) => setSelectedBurger(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">-- Choose Burger --</option>
            {dealOptions.burgers.map((burger) => (
              <option key={burger} value={burger}>
                {burger}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Fries */}
      {dealOptions?.fries?.length > 0 && (
        <div className="mb-3">
          <label className="block mb-1">Select Fries:</label>
          <select
            value={selectedFries}
            onChange={(e) => setSelectedFries(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">-- Choose Fries --</option>
            {dealOptions.fries.map((fry) => (
              <option key={fry} value={fry}>
                {fry}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Drink */}
      {dealOptions?.drinks?.length > 0 && (
        <div className="mb-3">
          <label className="block mb-1">Select Drink:</label>
          <select
            value={selectedDrink}
            onChange={(e) => setSelectedDrink(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="">-- Choose Drink --</option>
            {dealOptions.drinks.map((drink) => (
              <option key={drink} value={drink}>
                {drink}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Addons */}
      {addons?.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Add-ons:</h4>
          <div className="flex flex-wrap gap-3">
            {addons.map((addon) => (
              <label key={addon.label} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAddons.some((a) => a.label === addon.label)}
                  onChange={(e) => onAddonChange(e, addon)}
                />
                <span>{addon.label} (+Rs. {addon.price})</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DealOptions;
