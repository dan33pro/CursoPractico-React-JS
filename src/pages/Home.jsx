import React from 'react';
import ProductList from '@containers/ProductList';
import Header from '@components/Header';
import MenuDesktop from '@components/MenuDesktop';
import MenuMobile from '@components/MenuMobile';

const Home = () => {
  return (
    <>
      <Header />
      <MenuDesktop />
      <MenuMobile />
      <ProductList />
    </>
  );
}

export default Home;