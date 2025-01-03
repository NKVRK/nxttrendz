import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {id} = product
    if (cartList !== []) {
      console.log('entered')
      const item = cartList.find(eachItem => eachItem.id === id)
      console.log(item)
      if (item === undefined) {
        this.setState(prevState => ({
          cartList: [...prevState.cartList, product],
        }))
      } else {
        item.quantity += product.quantity
        this.setState({cartList})
      }
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: newCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(eachItem => eachItem.id === id)
    item.quantity += 1
    this.setState({cartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(eachItem => eachItem.id === id)
    if (item.quantity > 1) {
      item.quantity -= 1
      this.setState({cartList})
    } else {
      const newCartList = cartList.filter(eachItem => eachItem.id !== id)
      this.setState({cartList: newCartList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
