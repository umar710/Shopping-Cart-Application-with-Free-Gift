import { useState } from "react";

function Product({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    setQuantity(1);
  };

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
