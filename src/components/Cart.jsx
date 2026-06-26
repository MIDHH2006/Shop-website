function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <section className="cart">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
        </>
      )}
    </section>
  )
}

export default Cart
