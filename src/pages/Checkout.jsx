import { useMemo, useState } from 'react'

function Checkout({ cartItems }) {
  const [customerName, setCustomerName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [stateName, setStateName] = useState('')
  const [pincode, setPincode] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [shippingOption, setShippingOption] = useState('standard')
  const [promoCode, setPromoCode] = useState('')
  const [appliedCode, setAppliedCode] = useState('')
  const [promoMessage, setPromoMessage] = useState('')

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems],
  )

  const discount = appliedCode === 'SAVE10' ? subtotal * 0.1 : 0
  const shipping = shippingOption === 'express' ? 99 : 49
  const tax = (subtotal - discount) * 0.05
  const total = subtotal - discount + tax + shipping

  const cartEmpty = cartItems.length === 0
  const isCustomerInfoValid = customerName && address && city && stateName && pincode && phone

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase()
    if (!code) {
      setPromoMessage('Enter a promo code to apply.')
      setAppliedCode('')
      return
    }

    if (code === 'SAVE10') {
      setAppliedCode(code)
      setPromoMessage('Promo code applied: 10% off')
    } else {
      setAppliedCode('')
      setPromoMessage('Invalid promo code.')
    }
  }

  return (
    <section id="checkout" className="page checkout-page">
      <h2>Checkout</h2>
      {cartEmpty ? (
        <p>Your checkout cart is empty. Add a product to proceed.</p>
      ) : (
        <div className="checkout-layout">
          <div className="checkout-form">
            <div className="field-group">
              <label htmlFor="customerName">Full name</label>
              <input
                id="customerName"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="field-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Street, building, landmark"
              />
            </div>
            <div className="field-row">
              <div className="field-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="field-group">
                <label htmlFor="stateName">State</label>
                <input
                  id="stateName"
                  value={stateName}
                  onChange={(event) => setStateName(event.target.value)}
                  placeholder="State"
                />
              </div>
            </div>
            <div className="field-row">
              <div className="field-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  id="pincode"
                  value={pincode}
                  onChange={(event) => setPincode(event.target.value)}
                  placeholder="Pincode"
                />
              </div>
              <div className="field-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Mobile number"
                />
              </div>
            </div>
            <div className="field-group">
              <label>Payment method</label>
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="netbanking">Net Banking</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
            <div className="field-group">
              <label>Shipping option</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingOption === 'standard'}
                    onChange={() => setShippingOption('standard')}
                  />
                  Standard Delivery (₹49)
                </label>
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingOption === 'express'}
                    onChange={() => setShippingOption('express')}
                  />
                  Express Delivery (₹99)
                </label>
              </div>
            </div>
            <div className="field-group promo-group">
              <label htmlFor="promoCode">Promo code</label>
              <div className="promo-row">
                <input
                  id="promoCode"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="Enter promo code"
                />
                <button type="button" onClick={applyPromo}>
                  Apply
                </button>
              </div>
              {promoMessage && <p className="promo-message">{promoMessage}</p>}
            </div>
          </div>

          <aside className="checkout-summary">
            <div className="summary-card">
              <h3>Order summary</h3>
              <p>Items: {cartItems.length}</p>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span>₹{discount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong>₹{total.toFixed(2)}</strong>
              </div>
              <p className="summary-note">Delivery in 3-6 business days for standard shipping.</p>
              <button type="button" disabled={!isCustomerInfoValid}>
                Proceed to payment
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Checkout
