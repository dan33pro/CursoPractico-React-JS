# CursoPractico-React-JS

Este es mi desarrollo del curso de React.js practico de Platzi, donde retomamos la eshop que ya habíamos unido con JavaScript puro, para este curso tome la desición de trabajar con React 17.

## Indice
1. [Configurando el entorno de desarrollo para React](#configurando-el-entorno-de-desarrollo-para-react)
    1. [Instalción de React y React DOM](#instalción-de-react-y-react-dom)
    2. [Configuración de Webpack y Babel](#configuración-de-webpack-y-babel)
    3. [Cambios en tiempo real con Webpack](#cambios-en-tiempo-real-con-webpack)
    4. [React con CSS y Sass](#react-con-css-y-sass)
2. [Maquetación con React](#maquetación-con-react)
    1. [Transformando HTML y CSS en componentes de React](#transformando-html-y-css-en-componentes-de-react)
    2. [Estilos en los componentes de React](#estilos-en-los-componentes-de-react)
3. [Páginas, rutas y componentes](#páginas-rutas-y-componentes)
    1. [React Router DOM](#react-router-dom)
    2. [Navegación entre rutas](#navegación-entre-rutas)
    3. [Header en todas las rutas](#header-en-todas-las-rutas)

## Configurando el entorno de desarrollo para React

### Instalción de React y React DOM

1. Lo primero es instalar las dependencias necesarias para trabajar con react

   ```npm
   npm install react@17.0.2 react-dom@17.0.2
   ```

2. Ahora creamos la estructura básica del proyecto

   - Una carpeta `src` con un archivo `index.js` dentro de ella.
   - Una carpeta `public` con un archivo `index.html` dentro.
   - Dentro de `src` creamos una carpeta `components` con un archivo
     `App.jsx` dentro de esta.

3. En el archivo `App.jsx` agregamos

   ```jsx
   import React from "react";
   import '../styles/global.css';

   const App = () => {
     return <div>App</div>;
   };

   export default App;
   ```

> Como tengo instalado snippets uso `rafce`

4. en el archivo `index.js` agregamos

   ```js
   import React from "react";
   import ReactDOM from "react-dom";
   import App from './components/App';

   ReactDOM.render(<App />, document.getElementById("app"));
   ```

### Configuración de Webpack y Babel

1.  Instalamos las dependencias para `babel`

    ```npm
    npm install @babel/core @babel/preset-env @babel/preset-react
    ```

2.  Ahora las de `webpack`

    ```npm
    npm install webpack webpack-cli webpack-dev-server
    ```

3.  Ahora vamos a instalar los plugins y loaders necesarios

    ```npm
    npm install babel-loader html-loader html-webpack-plugin
    ```

4.  Ahora vamos a configurar las dependencias instaladas

    - Creamos un archivo `.bablerc` en la raíz y dentro agregamos, los
    `presets` para compilar `JS` moderno y `React`

        ```json
        {
            "presets": [
                "@babel/preset-env",
                "@babel/preset-react"
            ]
        }
        ```

    - Creamos un archivo `webpack.config.js` en la raíz y agregamos en el

        - Constantes y nuestro `module.esxports`

            ```js
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            const path = require('path');
            ```

            ```js
            module.exports = {}
            ```

            Dentro de este agregamos nuestro

                 - Punto de entrada `entry`
                 - Salida `output`
                 - Extensiones en `resolve` y `extensions`
                 - Los `loaders` para cada extensión en `module` y `rules`
                 - La configuarción para `plugins`

        ```js
        module.exports = {
            entry: './src/index.js',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'bundle.js',
            },
            resolve: {
                extensions: ['.js', '.jsx'],
            },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    },
                    {
                        test: /\.html$/,
                        use: [
                            {
                                loader: 'html-loader',
                            },
                        ],
                    },
                ],
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: './public/index.html',
                    filename: './index.html',
                }),
            ],

        }
        ```

### Cambios en tiempo real con Webpack

1. Agregamos en el `package.json` los `scripts`

    ```json
    "start": "webpack serve --open",
    "build": "webpack --mode production",
    "dev": "webpack --mode development"
    ```

2. Agregamos la estructura `html` necesaria

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React shop</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
    </html>
    ```

3. Corremos el comando `npm run start` para ver el resultado

### React con CSS y Sass

1. Instalamos las dependencias para trabajar con `sass`

    ```npm
    npm install mini-css-extract-plugin css-loader style-loader sass sass-loader -D
    ```

2. Ahora pasamos a configurar estas dependencias en `webpack.config.js`

    - Agergamos la contante de nuestro plugin

        ```js
        const MiniCssExtractPlugin = require('mini-css-extract-plugin');
        ```
    
    - Agregamos una nueva regla para los estilos en `rules`

        ```js
        {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
        },
        ```
    
    - En el array de `plugins` agregamos

        ```js
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        ```
    
    - Y agragamos una nueva propiedad en `module.exports`

        ```js
        devServer: {
            static: path.join(__dirname, 'dist'),
            compress: true,
            port: 3005,
        },
        ```
3. Creamos una carpeta `styles` dentro de `src` con un archivo `global.scss` con

    ```scss
    $base-color: #ff0000;
    $color: rgba(black, 0.88);

    body {
        background-color: $base-color;
        color: $color;
    }
    ```

4. Importamos los estilos en `App.jsx`

    ```jsx
    import '../styles/global.scss';
    ```

5. Corremos `npm run start` y vemos los resultados

> Voy a separar las configuarciones para el modo develompent y production

## Maquetación con React

### Transformando HTML y CSS en componentes de React

Como mencione en este proyecto también vamos a tomar la maquetación de la
eshop `YardSale` que trabajamos en el curso de [Curso de Front End 2](https://github.com/dan33pro/cursoDeFrontEnd-2)

1. En el primer archivo de [clase1.html](https://github.com/dan33pro/cursoDeFrontEnd-2-y-JS-Practico/blob/main/clase1.html) vamos a tomar la estructura `html` partiendo desde el `div` con clase `login`, vemos que más que un componente es un contenedor, así que en la carpeta `src` de nuestro repo creamos un directorio llamado `containers` con un archivo `Login.jsx` dentro con la siguiente estructura:

    ```jsx
    import React from 'react';
    import '../styles/login.scss';

    const Login = () => {
      return (
        
      );
    }

    export default Login;
    ```

    > Comando rafce

2. Dentro del `return` vamos a pegar nuestra estructura `html`

    ```jsx
    return (
        <div className ="login">
            <div className ="form-container">
                <img src="./logos/logo_yard_sale.svg" alt="logo" className ="logo" />
                <h1 className ="title">Create a new password</h1>
                <p className ="subtitle">Enter a new password for your account</p>
                <form action="/" className ="form">
                    <label for="password" className ="label">Password</label>
                    <input type="password" id="password" placeholder="*********" className ="input input-password" />
                    <label for="new-password" className ="label">Re-eneter password</label>
                    <input type="password" id="new-password" placeholder="*********" className ="input input-password" />
                    <input type="submit" value="Confirm" className ="primary-button login-button" />
                </form>
            </div>
        </div>
    );
    ```

    > En `React` es necesario cerrar todas las etiquetas y cambiar la palabra clave reservada `class` por `className`

### Estilos en los componentes de React

1. Podemos ver que los estilos de [clase1.html](https://github.com/dan33pro/cursoDeFrontEnd-2-y-JS-Practico/blob/main/clase1.html) usan variables, así que vamos a crear un archivo dentro del directorio `styles` con nombre `_vars.scss` y dentro agregamos nuestras variables:

    ```scss
    :root {
        --white: #FFFFFF;
        --black: #000000;
        --very-light-pink: #C7C7C7;
        --text-input-field: #F7F7F7;
        --hospital-green: #ACD9B2;
        --sm: 14px;
        --md: 16px;
        --lg: 18px;
    }
    ```

2. También vamos a crear un archivo con nombre `global.css` dentro del mismo directorio con:

    ```css
    body {
        margin: 0;
        font-family: 'Quicksand', sans-serif;
    }
    ```

3. Creamos un archivo `login.scss` con los estilos restantes de [clase1.html](https://github.com/dan33pro/cursoDeFrontEnd-2-y-JS-Practico/blob/main/clase1.html) y podemos usar @use o @import para traer nuestras variables:

    ```scss
    @use 'vars';

    .login {
        width: 100%;
        height: 100vh;
        display: grid;
        place-items: center;
    }
    .form-container {
        display: grid;
        grid-template-rows: auto 1fr auto;
        width: 300px;
    }
    .logo {
        width: 150px;
        margin-bottom: 48px;
        justify-self: center;
        display: none;
    }
    .title {
        font-size: var(--lg);
        margin-bottom: 12px;
        text-align: center;
    }
    .subtitle {
        color: var(--very-light-pink);
        font-size: var(--md);
        font-weight: 300;
        margin-top: 0;
        margin-bottom: 32px;
        text-align: center;
    }
    .form {
        display: flex;
        flex-direction: column;
    }
    .label {
        font-size: var(--sm);
        font-weight: bold;
        margin-bottom: 4px;
    }
    .input {
        background-color: var(--text-input-field);
        border: none;
        border-radius: 8px;
        height: 32px;
        font-size: var(--md);
        padding: 6px;
        margin-bottom: 12px;
    }
    .primary-button {
        background-color: var(--hospital-green);
        border-radius: 8px;
        border: none;
        color: var(--white);
        width: 100%;
        cursor: pointer;
        height: 50px;
        font-size: var(--md);
        font-weight: bold;
    }
    .login-button {
        margin-top: 14px;
        margin-bottom: 30px;
    }
    @media (max-width: 640px) {
        .logo {
            display: block;
        }
    }
    ```

4. Como estamos trabajndo con `css` y `scss` vamos a cambiar la regla en nuestro `webpack.config.js` y `webpack.config.dev.js`

    ```js
    test: /\.(css|scss)$/,
    ```

5. Ahora creamos otro contenedor con nombre `Layout.jsx` que va a recibir un `hijo` como 
parametro de la arrow function y los va a ir agregando a su estructura:

    ```jsx
    import React from 'react';

    const Layout = ({ children }) => {
    return (
        <div className='Layout'>
            {children}
        </div>
    );
    }

    export default Layout;
    ```

6. En nuestro archivo `App.jsx` dentro del `return` agregamos

    ```jsx
    return (
        <Layout>
        <Login />
        </Layout>
    );
    ```

    Y agregamos estos imports

    ```jsx
    import Layout from '../containers/Layout';
    import Login from '../containers/Login';
    import '../styles/global.css';
    ```

7. Para trabajar con fuentes las vamos a agregar temporalmente en el `head` de nuestro `index.html`

    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500;700&display=swap" rel="stylesheet">
    ```

## Páginas, rutas y componentes

### React Router DOM

Nos permite navegar entre distintas secciones de nuestro proyecto, recordemos que React
es `single-page` por lo que no cambia la url avanzando entre paginas, esta es la función
de `React Router Dom` nos permite avanzar entre secciones y cambiar el path, para que se
guarde adecuadamente el flujo de navegación,  instalamos la dependencia con 

    ```npm
    npm install react-router-dom
    ```

1. Reubicamos el archivo `App.jsx` porque no es ni un `componente` ni un `container`
y lo agregamos a una carpeta `routes`, ademas vamos a importar los siguientes recursos
de `react-router-dom` dentro de este archivo

    ```jsx
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Home from '../pages/Home';
    import NotFound from '../pages/NotFound';
    ```
2. Necesitamos cambiar la estructura de nuestro `return` en `App.jsx`

    ```jsx
    return (
        <BrowserRouter>
        <Layout>
            <Routes>
            <Route exact path='/' element = {<Home />} />
            <Route exact path='/login' element = {<Login />} />
            <Route exact path='/recovery-password' element = {<RecoveryPassword />} />
            <Route path='*' element = {<NotFound />} />
            </Routes>
        </Layout>
        </BrowserRouter>
    );
    ```

    1. `BrowsweRouter` se encarga de encontrar la ruta
    2. `Switch` es la logica de seleción de rutas
    3. `Route` lo usamos para definir cada ruta posible del `Switch` y un `default`

3. Como se puede ver, estamos agregando un container `RecoveryPassword` este lo construimos
igual que el container anterior `Login`, esta vez con el `html` y `css` de la [clase2](https://github.com/dan33pro/cursoDeFrontEnd-2-y-JS-Practico/blob/main/clase2.html) cuardamos el container en un `RecoveryPassword.jsx` y dentro de el importamos los estilos, que guardamos en un `RecoveryPassword.scss`.

4. En el archivo `index.js` cambiamos el path del import

    ```js
    import App from './routes/App';
    ```

> los components `Home` y `NotFound` los contruiremos más adelante

### Navegación entre rutas

1. En los archivos e configuración de `webpack` en el `output` agregamos

    ```js
    publicPath: '/',
    ```

    Para el de `webpack.config.dev.js` agregamos ademas en la propiedad `devServer`

    ```js
    historyApiFallback: true,
    ```

2. En nuestro `package.json` modificamos el script de `start` por

    ```json
    "start": "webpack serve --open --config webpack.config.dev.js",
    ```

3. En una carpeta `pages` dentro de `src` creamos nuestros archivos `Home.jsx` y `NotFound.jsx`

    1. El primero con

        ```jsx
        import React from 'react';

        const Home = () => {
        return (
            <div>Home</div>
        );
        }

        export default Home; 
        ```
    
    2. El segundo con

        ```jsx
        import React from 'react';
        import '../styles/NotFound.scss';

        const NotFound = () => {
        return (
            <div className='container'>
                <div className ="card">
                    <h1 className='titleNotFound'>404</h1>
                    <h2 className='titleNotFound'>Not Found</h2>
                </div>
                <a className='primary-button' href = "/">Home</a>
            </div>
        );
        }

        export default NotFound;
        ```
    
    3. Añadimos en la carpeta `styles` un archivo `NotFound.scss` con

        ```scss
        @use 'vars';

        .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .card {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .titleNotFound {
            font-family: 'Quicksand', sans-serif;
            font-size: 40;
            padding: 10px 40px;
        }

        .titleNotFound:first-child {
            font-size: 50px;
            border-right: 4px solid var(--hospital-green);
        }

        .primary-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30vw;
            cursor: pointer;
            height: 50px;
            text-decoration: none;
            background-color: var(--hospital-green);
            border-radius: 8px;
            border: none;
            color: var(--white);
            font-size: var(--md);
            font-weight: bold;
        }
        ```
4. Ya podemos correr `npm run start` y ver los distintos resultados cambiando la `url`

### Header en todas las rutas

Vamos ha agregar nuestro `header` como es un componente lo agragamos en `components` 
con el nombre `Header.jsx` y creamos en `styles` un archivo `Header.scss`

1. El archivo `.jsx` tendra el `html` de la [clase11](https://github.com/dan33pro/cursoDeFrontEnd-2-y-JS-Practico/blob/main/clase11.html)

    ```jsx
    import React from 'react';
    import '../styles/Header.scss';

    const Header = () => {
    return (
        <nav>
            <img src="./icons/icon_menu.svg" alt="menu" className ="menu" />
            <div className ="navbar-left">
                <img src="./logos/logo_yard_sale.svg" alt="logo" className ="logo" />
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
            <div className ="navbar-right">
                <ul>
                    <li className ="navbar-email">name@example.com</li>
                    <li className ="navbar-shopping-cart">
                        <img src="./icons/icon_shopping_cart.svg" alt="shopping_cart" />
                        <div>2</div>
                    </li>
                </ul>
            </div>
        </nav>
    );
    }

    export default Header;
    ```

2. El archivo `.scss` los estilos también de esa clase

    ```scss
    @use 'vars';

    nav {
        display: flex;
        height: 60px;
        padding: 0 24px;
        justify-content: space-between;
        border-bottom: 1px solid var(--very-light-pink);
    }
    .navbar-left {
        display: flex;
    }
    .menu{
        display: none;
        width: 25px;
    }
    .logo {
        width: 100px;
        margin-right: 12px;
    }
    .navbar-left ul,
    .navbar-right ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        height: 60px;
    }
    .navbar-left ul li a,
    .navbar-right ul li a{
        text-decoration: none;
        color: var(--very-light-pink);
        border: 1px solid var(--white);
        padding: 8px;
        border-radius: 8px;
    }
    .navbar-left ul li a:hover,
    .navbar-right ul li a:hover{
        border: 1px solid var(--hospital-green);
        color: var(--hospital-green);
    }
    .navbar-email {
        color: var(--very-light-pink);
        font-size: var(--sm);
        margin-right: 12px;
    }
    .navbar-shopping-cart {
        position: relative;
    }
    .navbar-shopping-cart div{
        width: 16px;
        height: 16px;
        position: absolute;
        top: -6px;
        right: -3px;
        background-color: var(--hospital-green);
        border-radius: 50%;
        font-size: var(--sm);
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 760px) {
        .menu {
            display: block;
        }
        .navbar-left ul{
            display: none;
        }
        .navbar-email {
            display: none;
        }
    }
    ```

3. Agreagmos el componente al `Page` de `Home`

    ```jsx
    import Header from '../components/Header';
    ...
    return (
        <Header />
    );
    ...
    ```
