import { useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'

const categoryOrder = ['Grains', 'Spices', 'Oils', 'Pulses']

function Products({ products, onAddToCart }) {
  const [expandedCategories, setExpandedCategories] = useState({
    Grains: true,
    Spices: true,
    Oils: true,
    Pulses: true,
  })

  const groupedProducts = categoryOrder.reduce((groups, category) => {
    groups[category] = products.filter((product) => product.category === category)
    return groups
  }, {})

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <section id="products" className="page products-page">
      <h2>Products</h2>
      {categoryOrder.map((category) => (
        <div key={category} className="category-section">
          <button
            type="button"
            className="category-header"
            onClick={() => toggleCategory(category)}
          >
            <div>
              <h3>{category}</h3>
              <span>{groupedProducts[category]?.length || 0} items</span>
            </div>
            <span className="toggle-icon">{expandedCategories[category] ? '−' : '+'}</span>
          </button>
          {expandedCategories[category] && (
            <div className="product-grid">
              {groupedProducts[category]?.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}

export default Products
