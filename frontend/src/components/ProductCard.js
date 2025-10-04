export default function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">₹{product.price}</p>
      </div>
      <button className="add-button" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
