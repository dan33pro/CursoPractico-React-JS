import React from 'react';
import '@styles/SendEmail.scss';
import logoYS from '@logos/logo_yard_sale.svg';
import iconEmail from '@icons/email.svg';

const SendEmail = () => {
  return (
    <div className ="SendEmail">
        <div className ="SendEmail-container">
            <img src={logoYS} alt="logo" className ="logo" />
            <h1 className ="title">Email has been sent!</h1>
            <p className ="subtitle">Please check your inbox for instructions on 
                how to reset the password</p>
            <div className ="email-image">
                <img src={iconEmail} alt="email" />
            </div>
            <button className ="primary-button SendEmail-button">Login</button>
            <p className ="resend">
                <span>Didn't receive the email?</span>
                <a href="/">Resend</a>
            </p>
        </div>
    </div>
  );
}

export default SendEmail;