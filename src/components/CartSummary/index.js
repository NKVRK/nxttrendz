import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const noOfItems = cartList.reduce(
        (acc, current) => acc + current.quantity,
        0,
      )
      const total = cartList.reduce(
        (acc, current) => acc + current.price * current.quantity,
        0,
      )

      return (
        <div className="cart-summary-con">
          <h1 className="cart-summary-total">
            Order Total: <span className="cart-summary-span ">Rs {total}</span>
          </h1>
          <p className="cart-summary-count">{noOfItems} Items in cart</p>
          <button type="button" className="cart-summary-btn">
            CheckOut
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
