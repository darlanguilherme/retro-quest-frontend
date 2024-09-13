import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './styles/GlobalStyles'

// Cria um root no elemento 'root'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Renderiza o aplicativo
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
