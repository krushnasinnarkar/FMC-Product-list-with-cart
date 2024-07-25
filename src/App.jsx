import React from 'react'
import Dessert from './components/Dessert'
import ConfirmedItem from './components/ConfirmedItem'
import emptyImg from './assets/images/illustration-empty-cart.svg'
import carbonNeutralImg from './assets/images/icon-carbon-neutral.svg'
import checkMarkIcon from './assets/images/icon-order-confirmed.svg'
import Data from '../data.json'

function App() {

  const [cart, setCart] = React.useState([])
  const [openModal, setOpenModal] = React.useState('')

  function addToCart(id) {
    if (cart.find(dessert => dessert.id === id)) {
      customSetCart(id, 1)
    } else {
      setCart(oldCart => {
        const newCart = [...oldCart]
        const dessert = Data.find(dessert => dessert.id === id)
        newCart.push({ name: dessert.name, price: dessert.price, quantity: 1, thumbnail: dessert.image.thumbnail, id })
        return newCart
      })
    }
  }

  function removeFromCart(id) {
    if (cart.find(dessert => dessert.id === id).quantity > 1) {
      customSetCart(id, -1)
    } else {
      removeDessert(id)
    }
  }

  function customSetCart(id, number) {
    setCart(oldCart => oldCart.map(dessert => {
      if (dessert.id === id) {
        return {
          ...dessert,
          quantity: dessert.quantity + number
        }
      } else {
        return dessert
      }
    }))
  }

  function removeDessert(id) {
    setCart(oldCart => oldCart.filter(dessert => !(dessert.id === id)))
  }

  function totalCartQuantity() {
    let total = 0
    cart.forEach(dessert => {
      total += dessert.quantity
    })
    return total
  }

  function orderTotal() {
    let total = 0
    cart.forEach(dessert => {
      total += (dessert.price * dessert.quantity)
    })
    return total
  }

  function confirmOrder() {
    setOpenModal('open')
    //if this was a functional app you can do other things here besides just opening the modal
  }

  function newOrder() {
    setCart([])
    setOpenModal('')
    window.scrollTo(0, 0)
  }

  const DessertElements = Data.map(dessert => {
    return (
      <Dessert
        key={dessert.id}
        id={dessert.id}
        imgMobile={dessert.image.mobile}
        imgTablet={dessert.image.tablet}
        imgDesktop={dessert.image.desktop}
        itemsInCart={cart.find(item => item.id === dessert.id)?.quantity || 0}
        category={dessert.category}
        title={dessert.name}
        cost={dessert.price}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    )
  })

  const cartElements = cart.map(dessert => {
    return (
      <div key={dessert.id}>
        <div className='cart-item'>
          <div className='cart-item-info'>
            <h4 className='no-margin'>{dessert.name}</h4>
            <div className='cart-text'>
              <p className='cart-item-quantity color-red no-margin'>{dessert.quantity}x</p>
              <p className='cart-item-cost no-margin'>@ ${dessert.price.toFixed(2)}</p>
              <p className='cart-item-total no-margin'>${(dessert.price * dessert.quantity).toFixed(2)}</p>
            </div>
          </div>
          <div className='close-btn-wrapper'>
            <button className='close-btn' onClick={() => removeDessert(dessert.id)}></button>
          </div>
        </div>
        <hr className='line-break'></hr>
      </div>

    )
  })

  const confirmationCartElements = cart.map(dessert => {
    return <ConfirmedItem
      key={dessert.id}
      thumbnail={dessert.thumbnail}
      name={dessert.name}
      quantity={dessert.quantity}
      price={dessert.price}
    />
  })


  return (
    <main className="app-container">
      <div className='desserts-and-cart'>
        <div className='desserts-container'>
          <h1>Desserts</h1>
          <div className='all-desserts'>
            {DessertElements}
          </div>
        </div>
        <div className='cart-container'>
          <div className='cart'>
            <h1 className='color-red'>Your Cart({totalCartQuantity()})</h1>
            {cartElements.length > 0 ?
              <div>
                {cartElements}
                <div className='order-total-container'>
                  <p>Order Total</p>
                  <p className='order-total'>${orderTotal().toFixed(2)}</p>
                </div>
                <div className='carbon-neutral'>
                  <img src={carbonNeutralImg} alt="carbon neutral icon" />
                  <p>This is a <span>carbon-neutral</span> delivery</p>
                </div>
                <button className='confirm-btn background-red red-btn' onClick={() => confirmOrder()}>Confirm Order</button>
              </div>
              :
              <div className='empty-cart-placeholder'>
                <img src={emptyImg} alt="illustration of an empty cart" />
                <p>Your added items will appear here</p>
              </div>
            }
          </div>
        </div>
      </div>
      <div className={`confirmation-modal-overlay ${openModal}`}>
        <div className="confirmation-modal">
          <img className='confirmation-icon' src={checkMarkIcon} alt="icon of a checkmark" />
          <h1 className='no-margin'>Order Confirmed</h1>
          <p>We hope you enjoy your food!</p>
          <div className='confirmation-cart-items'>
            {confirmationCartElements}
            <div className='order-total-container'>
              <p>Order Total</p>
              <p className='order-total'>${orderTotal().toFixed(2)}</p>
            </div>
          </div>
          <button className='new-order-btn background-red red-btn' onClick={() => newOrder()}>Start New Order</button>
        </div>
      </div>
    </main>
  )
}

export default App
