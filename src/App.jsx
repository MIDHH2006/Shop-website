import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Checkout from './pages/Checkout.jsx'
import Admin from './pages/Admin.jsx'
import Cart from './components/Cart.jsx'
import products from './data/products.js'

function App() {
  const [cartItems, setCartItems] = useState([])

  const handleAddToCart = (product) => {
    setCartItems((current) => [...current, product])
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Home />
        <Products products={products} onAddToCart={handleAddToCart} />
        <Checkout cartItems={cartItems} />
        <Admin />
      </main>
      <aside>
        <Cart items={cartItems} />
      </aside>
    </div>
  )
}

export default App
