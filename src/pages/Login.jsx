import React from 'react';
import '@styles/login.scss';
import logoYS from '@logos/logo_yard_sale.svg';

const Login = () => {
  return (
    <div className ="login">
        <div className ="login-container">
            <div>
                <img src={logoYS} alt="logo" className ="logo" />
                <form action="/" className ="form">
                    <label for="email" className ="label">Email address</label>
                    <input type="text" id="email" placeholder="name@example.com" className ="input input-email" />
                    <label for="plassword" className ="label">Password</label>
                    <input type="password" id="password" placeholder="*********" className ="input input-password" />
                    <input type="submit" value="Log in" className ="primary-button login-button" />
                    <a href="/">Forgot my password</a>
                </form>
            </div>
            <button className ="secondary-button signup-button">Sign up</button>
        </div>
    </div>
  );
}

export default Login;