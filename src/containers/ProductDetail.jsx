import React from 'react';
import ProductInfo from '@components/ProductInfo';
import '@styles/ProductDetail.scss';
import iconClose from '@icons/icon_close.png';

const ProductDetail = () => {
  return (
    <aside className ="ProductDetail">
        <div className ="ProductDetail-close">
            <img src={iconClose} alt="close" />
        </div>
        <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bike" />
        <ProductInfo />
    </aside>
  );
}

export default ProductDetail;