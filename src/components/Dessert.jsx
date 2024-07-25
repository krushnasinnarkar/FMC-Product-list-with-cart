import React from 'react'
import useImage from '../hooks/useImage'
import cartIcon from '../assets/images/icon-add-to-cart.svg'

export default function Dessert(props) {

    const { id, imgMobile, imgTablet, imgDesktop, category,
        title, cost, addToCart, removeFromCart, itemsInCart } = props
    
    const imgStyles = {
        border: "2px solid hsl(14, 86%, 42%)",
    }
    
    
    return (
        <div className='dessert'>
            <div className='image-wrapper'>
                <picture className='dessert-img' style={itemsInCart > 0 ? imgStyles : {}}>
                    <source srcSet={useImage(imgDesktop)} media="(min-width: 1440px)"/>
                    <source srcSet={useImage(imgTablet)} media="(min-width: 450px)"/>
                    <img src={useImage(imgMobile)} alt={`image of ${title}`}/>
                </picture>
                {itemsInCart > 0 ?
                    <div className='items-in-cart background-red'>
                        <div className='items-in-cart-btn-wrapper'>
                            <button
                                className='subtract'
                                onClick={() => removeFromCart(id)}
                            >
                            </button>
                        </div>
                        {itemsInCart}
                        <div className='items-in-cart-btn-wrapper'>
                            <button
                                className='add'
                                onClick={() => addToCart(id)}
                            >
                            </button>
                        </div>
                    </div> :
                    <button
                    className='empty-cart'
                    onClick={() => addToCart(id)}><img src={cartIcon} alt="cart icon"/>Add to Cart</button>
                }
            </div>
            <div className='text-wrapper'>
                <p className='category no-margin'>{category}</p>
                <h2 className='dessert-title no-margin'>{title}</h2>
                <p className='dessert-cost color-red no-margin'>${cost.toFixed(2)}</p>
            </div>
        </div>
    )
}