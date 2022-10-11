import React from 'react';
import '@styles/MyAccount.scss';

const MyAccount = () => {
  return (
    <div className ="MyAccount">
        <div className ="MyAccount-container">
            <h1 className ="title">My account</h1>
            <form action="/" className ="form">
                <div>
                    <label for="name" className ="label">Name</label>
                    <p className ="value">Nombre Apellido</p>                    
                    <label for="email" className ="label">Email address</label>
                    <p className ="value">name@example.com</p>                    
                    <label for="plassword" className ="label">Password</label>
                    <p className ="value">*********</p>                    
                </div>
                <input type="submit" value="Edit" className ="secondary-button account-button" />
            </form>
        </div>
    </div>
  );
}

export default MyAccount;