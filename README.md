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
    4. [Tipos de componentes en React: stateful vs. stateless](#tipos-de-componentes-en-react-stateful-vs-stateless)
    5. [Imágenes y alias en Webpack](#imágenes-y-alias-en-webpack)
4. [Lógica con React Hooks](#lógica-con-react-hooks)
    1. [React.useState and Toggle menú](#react-usestate-and-toggle-menú)
    2. [useEffect y consumo de APIs](#useeffect-y-consumo-de-apis)
    3. [Custom Hooks para la tienda](#custom-hooks-para-la-tienda)
    4. [useRef y formularios](#useref-y-formularios)
    5. [React Context](#react-context)
    6. [Completando el carrito de compras](#completando-el-carrito-de-compras)
    7. [Orden de compra](#orden-de-compra)
    8. [Calculando el precio total](#calculando-el-precio-total)
    9. [Eliminando productos del carrito](#eliminando-productos-del-carrito)
    10. [Optimización](#optimización)
5. [Deploy](#deploy)
    1. [Automatizando el despliegue con GitHub Actions](#automatizando-el-despliegue-con-github-actions)

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
Este mismo proceso lo vamos a repetir para todos los `components`, `containers` y `pages`, donde iran teniendo una relación padre hijo o ninguna, agregamos sus correspondientes estilos para cada elemento. 

### Tipos de componentes en React: stateful vs. stateless

1. `Stateful`: Son componentes que nos permiten trabajar con un `estado`:

    ```js
    import React, { useState } from 'react';

    const Button = () => {
        const [name, setName] = useState('Hola mundo');
        return (
            <div>
                <h1>{name}</h1>
            </div>
        );
    }
    ```
2. `Stateless`: son aquellos que solo hacen una representación visual o props:

    ```js
    import React from 'react';

    const ButtonUno = () => (
            <div>
                <h1>{name}</h1>
            </div>
    );

    const ButtonDos = () => <ButtonRed />;
    ```

3. Antes de `stateful` y `hooks` se trabajaba de la siguiente 
forma, pero ya no sule usarse:

    ```js
    import React, { Component } from 'react';

    class App extends Component {
        constructor() {
            super();
            ...
        }  
        render() {
            return (
                <div>Holaa!!</div>
            );
        }
    }
    ```

4. `Hooks`: Los componentes de orden superior, reciben un componente y
extieneden su funcionalidad, luego retornan un componente compuesto:

    ```js
    import React from 'react';

    function ComponentWrapper(WrapperComponent) {
        class Wrapper extends Component {
            render() {
                return <WrapperComponent {...this.props} />;
            }
        }
        return Wrapper;
    }
    ```

    Este también es un componente antiguo y poco usado.

### Imágenes y alias en Webpack

1. Vamos a crear una carpeta `assets` dentro de `src` y aquí
pegamos la copia de nuestras carpetas `iconos` y `logos` del curso
de [FrontEnd2](https://github.com/dan33pro/cursoDeFrontEnd-2-y-JS-Practico).

2. En los archivos de configuarción de `webpack` vamos a añadir una
nueva regla en `rules`

    ```js
    {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset',
    },
    ```

    Esta nos sirve para que `webpack` pueda optimizar los archivos
    con estas extenciones.

3. En estos archivos de configuración vamos ha añadir los alias en `resolve

    ```js
    alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@containers': path.resolve(__dirname, 'src/containers/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@routes': path.resolve(__dirname, 'src/routes/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@icons': path.resolve(__dirname, 'src/assets/icons/'),
        '@logos': path.resolve(__dirname, 'src/assets/logos/'),
    },
    ```

4. Ya con esto podemos agregarlos en todos los archivos que necesitemos con un `import`

## Lógica con React Hooks

### React useState and Toggle menú

Vamos a usar `Hooks` para agregar o quitar los menus de mobilie 
o dexktop, para esto en nuestro componente `header` agreagamos
estos `import`

    ```jsx
    import MenuDesktop from '@components/MenuDesktop';
    import MenuMobilie from '@components/MenuMobile';
    ```

1. Agregamos los dos `Hooks` dentro de nuestros `componentes`

    ```jsx
    const [toggleD, setToggleD] = useState(false);
    const handleToggleD = () => {
        setToggleD(!toggleD);
        setToggleM(false);
    };

    const [toggleM, setToggleM] = useState(false);
    const handleToggleM = () => {
        setToggleM(!toggleM);
        setToggleD(false);
    };
    ```
 2. Añadimos el atrobito `onClick` segun necesitemos

    ```jsx
    onClick={handleToggleM}
    onClick={handleToggleD}
    ```

### useEffect y consumo de APIs

UseEffect es una manera de que nuestro componente de React, puede recibir nueva info, re-renderizar o cambiar su contenido, cuando una función se haya completado. Es decir, podemos controlar el momento en el cual nuestro componente tome un cierto comportamiento.

1. Instalamos las dependencias

    ```npm
    npm install axios
    npm install @babel/plugin-transform-runtime
    ```

2. Agregamos la configuración para nuestro plugin de `babel` en el archivo `.babelrc`

    ```json
    {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ],
        "plugins": [
            "@babel/plugin-transform-runtime"
        ]
    }
    ```

3. En nuestro contenedor `ProductList.jsx` vamos a agregar temporalmente

    ```jsx
    const API = 'https://api.escuelajs.co/api/v1/products';
    ```

    También importamos

    ```jsx
    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    ```

    Ahora agregamos nuestro `Hook` y usamos `useEffect`

    ```jsx
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const response = await axios(API);
        setProducts(response.data);
    }, []);
    ```

    Con esto traemos la lista de productos haciendo la petición a nuestra `API`
    a través de `axios` y con asinacronismo esperamos la respuesta antes de
    agregar los productos a nuestro array de `products` del `Hook`.

### Custom Hooks para la tienda

1. Ahora vamos a crear un folder `hooks` dentro de `src` agreamos el alias en los
archivos de configuración de `webpack` y ahora vamos a pasar el `Hook` que 
creamos temporalmente dentro de `ProductList.jsx` y lo agregamos a un
archivo dentro de `src/hooks/useGetProducts.js`

    ```js
    import { useEffect, useState } from "react";
    import axios from "axios";

    const useGetProducts = (API) => {
        const [products, setProducts] = useState([]);

        useEffect(async () => {
            const response = await axios(API);
            setProducts(response.data);
        }, []);

        return products;
    };

    export default useGetProducts;
    ```

2. Ahora podemos usar nuestro `custom hook` siempre que necesitemos, por ultimo
en el archivo `ProductList.jsx` ya podemos quitar el import de `axios`, `useEffect` y
`useState`, en su lugar importamos

    ```jsx
    import useGetProducts from '@hooks/useGetProducts';
    ```

Y nuestro componente quedaría así

    ```jsx
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
            {products.map(product => (
            <ProductItem product = {product} key = {product.id}/>
            ))}
        </div>
        </section>
    );
    }

    export default ProductList;
    ```

3. Como vemos hacemos uso de nuestro `custom hook` y nuestro `ProductItem`
ahora recibe dos parametros un `product` y un `key` para que podemos
identificar cada producto con un `id` en nuestro `virtualDom`.

4. En nuestro componente `ProductItem.jsx` decimos que va a 
recibir el parametro `product`

    ```jsx
    const ProductItem = ({product}) => {
    ...
    }
    ```

5. Y remplazamos la información que necesitemos en la estructura de
nuestro componenete

    ```jsx
    return (
        <div className ="ProductItem">
            <img src={product.images[0]} alt={product.title} />
            <div className ="ProductItem-info">
                <div>
                    <p>${product.price}</p>
                    <p>{product.title}</p>
                </div>
                <figure onClick={handleClick}>
                    <img src={btAddCart} alt="" />
                </figure>
            </div>
        </div>
    );
    ```

### useRef y formularios

Cuando queremos enviar información desde nuestros dormularios hasta nuestro
Back End podemos usar `useState` sin embargo no es la mejor froma de hacerlo
en su lugar podemos usar `useRef`, para esto en nuestro `Login.jsx` importamos

    ```jsx
    import React, { useRef } from 'react';
    ```

1. Vamos a implementar nuestro `hook` de la siguinete manera

    ```jsx
    const form = useRef(null);

    const handleSubmit = () => {
        const formData = new FormData(form.current);
        const data = {
        username: formData.get('email'),
        password: formData.get('password'),
        };
        console.log(data);
    }
    ```

2. Donde nuestro formulario tendría la siguinete estructura

    ```jsx
    <form action="/" className ="form" ref={form}>
        <label htmlFor="email" className ="label">Email address</label>
        <input type="text" name="email" placeholder="name@example.com" className ="input input-email" />
        <label htmlFor="plassword" className ="label">Password</label>
        <input type="password" name="password" placeholder="*********" className ="input input-password" />
        <button onClick={handleSubmit} className ="primary-button login-button">
        Log in
        </ button>
        <a href="/">Forgot my password</a>
    </form>
    ```

Nuetro `form` una referencia a nuestra constante `form`, y cada `input`
una propiedad `name` que es la que usamos para obtener su valor con
`formData.getData('name')`

3. Para cambiar el comportamiento por default de nuestro `form` tenemos que
hacer un `preventDefault`.

    ```jsx
    const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
        username: formData.get('email'),
        password: formData.get('password'),
    };
    console.log(data);
    }
    ```

### React Context

Es una solución para manejar un contexto global en nuestra aplicación, 
con esto por ejemplo no tendriamos que pasar los `props` por todos
los padres de un componenete hasta llegar al hijo que necesitemos.

1. Creamos una carpeta `context` en `src` con un archivo `AppContext`.

    ```js
    import React from 'react';

    const AppContext = React.createContext({});

    export default AppContext;
    ```

2. Agregamos el alias de `context` en los archivos de configuración de `webpack`.

3. Creamos un nuevo `custom hook` para el estado inicial de muestro `context`, con
el nombre `useInitialState.js`

    ```js
    import { useState } from "react";

    const initialState = {
        cart: [],
    };

    const useInitialState = () => {
        const [state, setState] = useState(initialState);

        const addToCart = (payload) => {
            setState({
                ...state,
                cart: [
                    ...state.cart,
                    payload,
                ]
            })
        }

        return {
            state,
            addToCart,
        };
    };

    export default useInitialState;
    ```

4. Con esto en nuestro archivo `App.jsx` imortamos

    ```jsx
    import AppContext from '@context/AppContext';
    import useInitialState from '@hooks/useInitialState';
    ```
    Cremos una constante con el estado inical y en el return agregamos el contexto
    con su estado inicial.

    ```jsx
    const App = () => {
        const initialState = useInitialState();
        
        return (
            <AppContext.Provider value={initialState}>
                <BrowserRouter>
                    ...
                </BrowserRouter>
            </AppContext.Provider>
        );
    }
    ```

### Completando el carrito de compras

1. Para que en nuestro carrito incremente el numero cada vez que
damos click en el boton para agregar un producto, vamos a importar
en el `Header.jsx`

    ```jsx
    import React, { useState, useContext } from 'react';
    import AppContext from '@context/AppContext';
    ```

2. Agregamos la variable del estado

    ```jsx
    const Header = () => {
        const { state } = useContext(AppContext);
        ...
    }
    ```

### Orden de compra

Ahora en nuestra orden de compra tenemos que agregar cada producto 
que vamos agregando, para esto usamos tambien el contexto

1. Imprtamos lo necesario

    ```jsx
    import React, { useContext } from 'react';
    import AppContext from '@context/AppContext';
    ```

2. Agregamos la constante para el estado

    ```jsx
    const MyOrder = () => {
        const { state } = useContext(AppContext);
        ...
    }
    ```

3. Donde necesitamos agregar los `OrderItem`, agregamos un `.map()` por
cada elemento del `cart` en el `state` de la app.

    ```jsx
    ...
    <div className="MyOrder-content">
        {state.cart.map(product => (
            <OrderItem product={product} key={`orderItem-${product.id}`} />
        ))}
        <div className="order">
            ...
        </div>
    </div>
    ```

4. Ya añadiendo nuestros componentes vamos a ajustarlos, en el `OrderItem.jsx`
ahora recibimos un `product` con el que vamos a remplazar la información
necesaria para cada producto.

    ```jsx
    const OrderItem = ({ product }) => {
    return (
        <div className ="OrderItem">
            <figure>
                <img src={product.images[0]} alt={product.title} />
            </figure>
            <p>{product.title}</p>
            <p>${product.price}</p>
            <img src={iconClose} alt="close" className ="OrderItem-close" />
        </div>
    );
    }
    ```

### Calculando el precio total

En el archivo `MyOrder.jsx` vamos a agregar una función para calcular el
total de los elementos en el carrito de compras, función que de ser necesario
podriamos convertir en un `custom hook`.

    ```jsx
    const sumTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        const sum = state.cart.reduce(reducer, 0);
        return sum;
    }
    ```

Remplazamos en la estructura `html` del archivo por el llamado
a esta función

    ```jsx
    ...
    <div className="order">
        <p>
            <span>Total</span>
        </p>
        <p>${sumTotal()}</p>
    </div>
    ```

### Eliminando productos del carrito

1. Para esto vamos a agregar una nueva función en nuestro `useInitialState`

    ```js
    ...
    const removeFromCart = (indexValue) => {
        setState({
            ...state,
            cart: state.cart.filter( (item, index) => index != indexValue ),
        })
    }

    return {
        state,
        addToCart,
        removeFromCart,
    };
    ```

2. En nuestro `OrderItem` vamos a importar

    ```jsx
    import React, {useContext} from 'react';
    import AppContext from '@context/AppContext';
    ```

3. Y agregamos la función de control y la constate del metodo
que necesitamos del estado

    ```jsx
    const OrderItem = (props) => {
        const { product, indexValue } = props;
        const { removeFromCart } = useContext(AppContext);

        const handleRemove = (index) => {
            removeFromCart(index);
        }
        ...
    ```

4. Agregamos el evento en el elemento activador

    ```jsx
    <img src={iconClose} alt="close" className ="OrderItem-close"  onClick={() => handleRemove(indexValue)}/>
    ```

5. Hacemos los cambios de `props` en `MyOrder.jsx`

    ```jsx
    <div className="MyOrder-content">
        {state.cart.map((product, index) => (
            <OrderItem indexValue={index} product={product} key={`orderItem-${product.id}`} />
        ))}
    </div>
    ```

### Optimización

1. Instalamos las dependecias de optimización

    ```npm
    npm install css-minimizer-webpack-plugin terser-webpack-plugin -D
    ```

2. Agregamos la configuración en nuestro archivo de configuració `webpack.config.js`.

    ```js
    const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
    const TerserWebpackPlugin = require('terser-webpack-plugin');
    ```

3. Agregamos la propiedad de `optization`

    ```js
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ],
    },
    ```

## Deploy

### Automatizando el despliegue con GitHub Actions

1. En la zona de `market place` dentro de `GitHub` buscamos
`deploy to github pages`.

2. En nuestro repositorio creamos una carpeta `.github` con un directorio dentro `workflows` con un archivo `deploy.yml` dentro.

3. Pegamos y modificamos el recurso script que encontramos en `deploy to github pages`

    ```yml
    name: Build and Deploy
    on: [push]
    permissions:
    contents: write
    jobs:
    build-and-deploy:
        concurrency: ci-${{ github.ref }} # Recommended if you intend to make multiple deployments in quick succession.
        runs-on: ubuntu-latest
        steps:
        - name: Checkout 🛎️
            uses: actions/checkout@v3

        - name: Install and Build 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
            run: |
            npm ci
            npm run build

        - name: Deploy 🚀
            uses: JamesIves/github-pages-deploy-action@v4
            with:
            folder: dist # The folder the action should deploy.
    ```

4. Subimos cambios al repositorio remoto