import React, { useState } from 'react';
import '@styles/Header.scss';

import MenuDesktop from '@components/MenuDesktop';
import MenuMobilie from '@components/MenuMobile';
import MyOrder from '@containers/MyOrder';

import logoYS from '@logos/logo_yard_sale.svg';
import iconMenu from '@icons/icon_menu.svg';
import iconShoppingCart from '@icons/icon_shopping_cart.svg';

const Header = () => {
    const [toggleD, setToggleD] = useState(false);
    const handleToggleD = () => {
        setToggleD(!toggleD);
        setToggleM(false);
        setToggleO(false);
    };

    const [toggleM, setToggleM] = useState(false);
    const handleToggleM = () => {
        setToggleM(!toggleM);
        setToggleD(false);
        setToggleO(false);
    };

    const [toggleO, setToggleO] = useState(false);
    const handleToggleOrder = () => {
        setToggleO(!toggleO);
        setToggleM(false);
        setToggleD(false);
    }

    return (
        <nav>
            <img src={iconMenu} alt="menu" className="menu" onClick={handleToggleM} />
            <div className="navbar-left">
                <img src={logoYS} alt="logo" className="nav-logo" />
                <ul>
                    <li>
                        <a href="/">All</a>
                    </li>
                    <li>
                        <a href="/">Clothes</a>
                    </li>
                    <li>
                        <a href="/">Electronics</a>
                    </li>
                    <li>
                        <a href="/">Furnitures</a>
                    </li>
                    <li>
                        <a href="/">Toys</a>
                    </li>
                    <li>
                        <a href="/">Others</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <ul>
                    <li className="navbar-email" onClick={handleToggleD}>name@example.com</li>
                    <li className="navbar-shopping-cart" onClick={handleToggleOrder}>
                        <img src={iconShoppingCart} alt="shopping_cart" />
                        <div>2</div>
                    </li>
                </ul>
            </div>
            {toggleD && <MenuDesktop />}
            {toggleM && <MenuMobilie />}
            {toggleO && <MyOrder />}
        </nav>
    );
}

export default Header;