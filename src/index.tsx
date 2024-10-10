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
    fontFamily: 'Cheese Matcha, Arial, sans-serif',
    // fontFamily: 'Happy Paradise, Arial, sans-serif',
    // fontFamily: 'Hey Comic, Arial, sans-serif',
    // fontFamily: 'nulshock-bd.otf, Arial, sans-serif',
    // fontFamily: 'KGBlankSpaceSketch.otf, Arial, sans-serif',
  },
  components: {
    MuiButton: {
        styleOverrides: {
            root: {
                backgroundColor: '#5478F0', // Cor primária
                color: '#ffffff', // Cor do texto
                '&:hover': {
                    backgroundColor: '#115293', // Cor ao passar o mouse
                },
            },
        },
    },
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
