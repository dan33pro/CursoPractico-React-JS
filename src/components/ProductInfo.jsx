import React, { useContext } from 'react';
import AppContext from '@context/AppContext';
import '@styles/ProductInfo.scss';
import btAddCart from '@icons/bt_add_to_cart.svg';

const ProductInfo = () => {
  const { state, addToCart } = useContext(AppContext);
  const payload = state.actualProduct[0] ? state.actualProduct[1] : null;

  return (
    <div className ="ProductInfo">
        <p>${payload.price}</p>
        <p>{payload.title}</p>
        <p>
          {payload.description}
        </p>
        <button className ="primary-button add-to-cart-button" onClick={() => addToCart(payload)}>
            <img src={btAddCart} alt="add to cart" />
            Add to cart
        </button>
    </div>
  );
}

export default ProductInfo;