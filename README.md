# CursoPractico-React-JS

Este es mi desarrollo del curso de React.js practico de Platzi, donde retomamos la eshop que ya habíamos unido con JavaScript puro, para este curso tome la desición de trabajar con React 17.

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