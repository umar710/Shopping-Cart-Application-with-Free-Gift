import { useState, useEffect } from "react";
import { PRODUCTS, FREE_GIFT, THRESHOLD } from "./constants";
import Product from "./components/Product";
import Cart from "./components/Cart";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

function App() {
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [showGiftMessage, setShowGiftMessage] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const hasFreeGift = cart.some((item) => item.id === FREE_GIFT.id);

  useEffect(() => {
    if (subtotal >= THRESHOLD && !hasFreeGift) {
      setCart([...cart, { ...FREE_GIFT, quantity: 1 }]);
      setShowGiftMessage(true);
      setTimeout(() => setShowGiftMessage(false), 3000);
    } else if (subtotal < THRESHOLD && hasFreeGift) {
      setCart(cart.filter((item) => item.id !== FREE_GIFT.id));
    }
  }, [subtotal, hasFreeGift, cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div className="app">
      <h1>Shopping Cart</h1>
      <hr />
      <h2>Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>

      <h2>Cart Summary</h2>
      <div className="cart-container">
        <ProgressBar subtotal={subtotal} threshold={THRESHOLD} />
        {showGiftMessage && (
          <div className="gift-message">
            Congratulations! You've earned a free gift!
          </div>
        )}
        <Cart
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          subtotal={subtotal}
          hasFreeGift={hasFreeGift}
        />
      </div>
    </div>
  );
}

export default App;
