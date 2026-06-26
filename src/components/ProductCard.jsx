function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-details">
        <div className="product-category">{product.category}</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-meta">
          <span>${product.price.toFixed(2)}</span>
          <button type="button" onClick={() => onAddToCart(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
