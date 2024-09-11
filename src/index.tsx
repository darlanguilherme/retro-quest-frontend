import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Cria um root no elemento 'root'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Renderiza o aplicativo
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
