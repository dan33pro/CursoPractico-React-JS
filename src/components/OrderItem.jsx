import React from 'react';
import '@styles/OrderItem.scss';
import iconClose from '@icons/icon_close.png';

const OrderItem = ({ product }) => {
  return (
    <div className ="OrderItem">
        <figure>
            <img src={product.images[0]} alt={product.title} />
        </figure>
        <p>{product.title}</p>
        <p>${product.price}</p>
        <img src={iconClose} alt="close" className ="OrderItem-close" />
    </div>
  );
}

export default OrderItem;