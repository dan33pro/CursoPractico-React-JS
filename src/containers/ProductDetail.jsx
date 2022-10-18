import React, { useContext } from 'react';
import AppContext from '@context/AppContext';
import ProductInfo from '@components/ProductInfo';
import '@styles/ProductDetail.scss';
import iconClose from '@icons/icon_close.png';

const ProductDetail = () => {
  const { state, removeFromActualProduct } = useContext(AppContext);
  const payload = state.actualProduct;

  const handleToggleProductDetail = () => {
    removeFromActualProduct();
  }

  return (
    <aside className ="ProductDetail">
        <div className ="ProductDetail-close" onClick={ () => handleToggleProductDetail()}>
            <img src={iconClose} alt="close" />
        </div>
        {console.log(payload[1])}
        <img src={payload[0] && payload[1].images[0]} alt={payload[1].title} />
        <ProductInfo />
    </aside>
  );
}

export default ProductDetail;