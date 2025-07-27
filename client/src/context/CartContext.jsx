import { createContext, useContext, useReducer, useEffect } from "react";

// Create Context
const CartContext = createContext();

const getCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const normalizeAddOns = (arr) =>
  (arr || []).map((a) => typeof a === "string" ? a : a?.name || "").sort();

const isSameAddOns = (a, b) => {
  const normA = normalizeAddOns(a);
  const normB = normalizeAddOns(b);
  if (normA.length !== normB.length) return false;
  return normA.every((val, i) => val === normB[i]);
};


// Initial State
const initialState = {
  items: getCartFromStorage(),
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const payload = {
        ...action.payload,
        addOns: normalizeAddOns(action.payload.addOns), // ✅ normalize before storing
      };

      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.flavor === action.payload.flavor &&
          isSameAddOns(item.addOns, payload.addOns)
      );

      

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item === existing
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }

    case "UPDATE_QUANTITY": {

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.flavor === action.payload.flavor &&
          isSameAddOns(item.addOns, action.payload.addOns)
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
      };
    }

    case "REMOVE_FROM_CART": {
      
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.size === action.payload.size &&
              item.flavor === action.payload.flavor &&
              isSameAddOns(item.addOns, action.payload.addOns)
            )
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Custom Hook
export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save to localStorage whenever cart items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  // Helper Functions
  const addToCart = (item) => {
    const normalizedItem = {
      ...item,
      addOns: normalizeAddOns(item.addOns), // ✅ normalize before dispatch
    };
    dispatch({ type: "ADD_TO_CART", payload: normalizedItem });
  };

  const updateQuantity = (id, size, flavor, addOns, newQuantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, size, flavor, addOns, newQuantity },
    });
  };

  const removeFromCart = (id, size, flavor, addOns) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id, size, flavor, addOns },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getCartTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
