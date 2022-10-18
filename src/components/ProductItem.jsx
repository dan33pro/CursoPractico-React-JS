import React, { useContext, useState } from 'react';
import '@styles/ProductItem.scss';
import AppContext from '@context/AppContext';
import btAddCart from '@icons/bt_add_to_cart.svg';

const ProductItem = ({product}) => {
  const { addToCart, addToActualProduct } = useContext(AppContext);
  
  const handleToggleProductInfo = (item) => {
    addToActualProduct(item);
  }

  const handleClick = (item) => {
    addToCart(item);
  };
  
  return (
    <div className ="ProductItem">
        <img src={product.images[0]} alt={product.title} onClick={() => handleToggleProductInfo(product)} />
        <div className ="ProductItem-info">
            <div>
                <p>${product.price}</p>
                <p>{product.title}</p>
            </div>
            <figure onClick={() => handleClick(product)}>
                <img src={btAddCart} alt="" />
            </figure>
        </div>
    </div>
  );
}

export default ProductItem;