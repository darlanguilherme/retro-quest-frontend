// src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* Layout.css */
    .layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .content {
        flex: 1;
        padding: 20px;
        margin-left: 240px;
        /* Largura do Sidebar */
        margin-top: 64px;
        /* Altura do Header */
        margin-bottom: 64px;
        /* Altura do Footer */
    }

    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

    ::-webkit-scrollbar-track
{
-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0,3);
border-radius: 5px;
background-color: #ffffff;
}
::-webkit-scrollbar
{
width: 05px;
background-color:#ffffff;
}
::-webkit-scrollbar-thumb
{
border-radius: 5px;
::-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);
background-color: #D6E3FF;
}
`;

export default GlobalStyle;
