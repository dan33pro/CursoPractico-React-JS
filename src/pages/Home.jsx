import React, { useContext } from 'react';
import AppContext from '@context/AppContext';
import ProductList from '@containers/ProductList';
import ProductDetail from '@containers/ProductDetail';
import Header from '@components/Header';

const Home = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      <Header />
      <ProductList />
      { state.actualProduct[0] && <ProductDetail /> }
    </>
  );
}

export default Home;