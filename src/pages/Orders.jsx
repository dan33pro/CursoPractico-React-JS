import React from 'react';
import Order from '@components/Order';
import '@styles/Orders.scss';

const Orders = () => {
  return (
    <div className ="Orders">
        <div className ="Orders-container">
            <h1 className ="title">My orders</h1>
            <div className ="Orders-content">
                <Order />
                <Order />
                <Order />
                <Order />
                <Order />
            </div>
        </div>
    </div>
  );
}

export default Orders;