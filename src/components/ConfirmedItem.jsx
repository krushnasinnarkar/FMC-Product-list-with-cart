import React from 'react'
import useImage from '../hooks/useImage'

export default function ConfirmedItem(props) {
    return (
        <div>
            <div className='confirmation-item'>
                <img src={useImage(props.thumbnail)} alt={`thumbnail image of ${props.name}`}/>
                <div className='confirmation-item-details'>
                    <h4 className='no-margin'>{props.name}</h4>
                    <div className='confirmation-quantity'>
                        <p className='color-red no-margin'>{props.quantity}x</p>
                        <p className='no-margin'>@${props.price.toFixed(2)}</p>
                    </div>
                </div>
                <p className='confirmation-total'>${(props.price * props.quantity).toFixed(2)}</p>
            </div>
            <hr className='line-break'></hr>
        </div>
      )
}