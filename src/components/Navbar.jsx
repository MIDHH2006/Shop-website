import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">My Shop</div>
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#checkout">Checkout</a>
        <a href="#admin">Admin</a>
      </nav>
    </header>
  )
}

export default Navbar
