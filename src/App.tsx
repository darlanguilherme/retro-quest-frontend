import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PrivateRoute from './hooks/PrivateRouteService';
import { AuthProvider } from './context/AuthProvider';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Main />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
