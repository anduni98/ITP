import React, { Component } from 'react';
import '../css/EmptyCart.css'


export class EmptyCart extends Component {
    render() {
        return (
            <div className="empty">
                <h2>Your shopping cart is empty </h2>

                <button >Continue</button>


            </div>
        )
    }
}

export default EmptyCart