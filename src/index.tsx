// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';


const theme = createTheme({
  typography: {
    // fontFamily: 'Cheese Matcha, Arial, sans-serif',
    // fontFamily: 'Happy Paradise, Arial, sans-serif',
    fontFamily: 'Hey Comic, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} />
  </ThemeProvider>
  // </React.StrictMode>
);
