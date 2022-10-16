import React from 'react';
import ProductItem from '@components/ProductItem';
import useGetProducts from '@hooks/useGetProducts';
import '@styles/ProductList.scss';

const API = 'https://api.escuelajs.co/api/v1/products';

const ProductList = () => {
  const products = useGetProducts(API);

  return (
    <section className="ProductList">
      <div className="ProductList-container">
        {products.map(product => {
          if (product.images[0]) {
            return <ProductItem product = {product} key = {`productItem-${product.id}`}/>;
          }
        })}
      </div>
    </section>
  );
}

export default ProductList;