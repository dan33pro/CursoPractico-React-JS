import React from 'react';
import ShoppingCartItem from '@components/ShoppingCartItem';
import '@styles/MyOrder.scss';
import arrow from '@icons/flechita.svg';

const MyOrder = () => {
  return (
    <aside className ="MyOrder">
        <div className ="title-container">
            <img src={arrow} alt="arrow" />
            <p className ="title">
                Shopping cart
            </p>
        </div>
        <div className ="MyOrder-content">
            <ShoppingCartItem />
            <ShoppingCartItem />
            <ShoppingCartItem />
            <ShoppingCartItem />
            <div className ="order">
                <p>
                    <span>Total</span>
                </p>
                <p>$560.00</p>
            </div>
        </div>
        <button className ="primary-button">
            Checkout
        </button>
    </aside>
  );
}

export default MyOrder;