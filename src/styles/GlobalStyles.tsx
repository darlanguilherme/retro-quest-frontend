// src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'Cheese Matcha';
      src: url('/fonts/Cheese-Matcha.otf') format('opentype');
      font-style: normal;
    }

    @font-face {
      font-family: 'Happy Paradise';
      src: url('/fonts/Happy-Paradise.otf') format('opentype');
      font-style: normal;
    }

    @font-face {
      font-family: 'Hey Comic';
      src: url('/fonts/Hey-Comic.otf') format('opentype');
      font-style: normal;
    }
    /* Aplicar fonte a todos os elementos h1, h2, h3, h4, h5, h6 */
     h1, h2, h3, h4, h5, h6 {
       font-family: 'Sweet Darling', sans-serif;
     }

    /* Definir a fonte globalmente */
    body {
        font-family: 'Sweet Darling', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Layout.css */
    .layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .content {
        flex: 1;
        padding: 20px;
        margin-left: 240px; /* Largura do Sidebar */
        margin-top: 64px;   /* Altura do Header */
        margin-bottom: 64px; /* Altura do Footer */
    }

    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0,3);
        border-radius: 5px;
        background-color: #ffffff;
    }
    ::-webkit-scrollbar {
        width: 5px;
        background-color: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
        background-color: #D6E3FF;
    }
`;

export default GlobalStyle;
