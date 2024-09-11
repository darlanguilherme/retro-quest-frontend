import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PrivateRoute from './hooks/PrivateRouteService'; // Adicione o caminho correto
import { AuthProvider } from './context/AuthProvider'; // Adicione o caminho correto

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Main />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
