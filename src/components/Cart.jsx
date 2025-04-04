function Cart({ cart, onUpdateQuantity, onRemoveItem, subtotal, hasFreeGift }) {
  return (
    <div className="cart">
      <h2>Cart Items</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  {item.id === "free-gift" && (
                    <span className="gift-badge">{item.gift}</span>
                  )}
                  <span className="item-price">
                    ₹{item.price} × {item.quantity}
                  </span>
                </div>
                {item.id !== "free-gift" && (
                  <div className="cart-item-actions">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="quantity-btn minus"
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="quantity-btn plus"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p className="subtotal">Subtotal: ₹{subtotal}</p>
            {hasFreeGift && (
              <p className="free-gift-note">
                🎉 You've qualified for a free gift!
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
