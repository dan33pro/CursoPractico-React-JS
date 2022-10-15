import React, { useRef } from 'react';
import '@styles/login.scss';
import logoYS from '@logos/logo_yard_sale.svg';

const Login = () => {
  const form = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      username: formData.get('email'),
      password: formData.get('password'),
    };
    console.log(data);
  }

  return (
    <div className="login">
      <div className="login-container">
        <div>
          <img src={logoYS} alt="logo" className="logo" />
          <form action="/" className="form" ref={form}>
            <label htmlFor="email" className="label">Email address</label>
            <input type="text" name="email" placeholder="name@example.com" className="input input-email" />
            <label htmlFor="plassword" className="label">Password</label>
            <input type="password" name="password" placeholder="*********" className="input input-password" />
            <button onClick={handleSubmit} className="primary-button login-button">
              Log in
            </ button>
            <a href="/">Forgot my password</a>
          </form>
        </div>
        <button className="secondary-button signup-button">Sign up</button>
      </div>
    </div>
  );
}

export default Login;