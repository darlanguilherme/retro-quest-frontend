import React, { useEffect, useState } from 'react';
import { createUser, login } from '../services/apiService';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    if (isAuthenticated) {
      navigate('/');
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div></div>;
  }

  const handleCreateUserClick = () => {
    setUsername('');
    setPassword('');
    setIsCreatingUser(true);
  };

  const handleBackToLogin = () => {
    setIsCreatingUser(false);
    setUsername('');
    setPassword('');
  };

  const handleLogin = async () => {
    try {
      const response = await login({
        username,
        password,
      });
      console.log('response', response)

      const { access_token: token, user } = response;

      if (!token) {
        toast.error(`Falha ao realizar o login.`);
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      window.location.href = '/';
    } catch (err) {
      toast.error(`Falha ao realizar o login.`);
      console.error(err);
    }
  };

  const handleCreateUser = async () => {
    try {
      await createUser({ username, password, role: "USER" });
      toast.success('Usuário criado com sucesso!');
      handleBackToLogin();
    } catch (error: any) {
      console.error('Erro ao criar o usuário:', error.message);
      toast.error(`Erro: ${error.message || 'Não foi possível criar o usuário.'}`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Paper elevation={3} sx={{ padding: 2, width: 300 }}>
        {!isCreatingUser ? (
          <>
            <Typography variant="h6" gutterBottom>
              Login
            </Typography>
            <TextField
              label="Usuário"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
              <Button variant="outlined" onClick={handleCreateUserClick}>
                Criar Usuário
              </Button>
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Criar Usuário
            </Typography>
            <TextField
              label="Usuário"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 10) {
                  setUsername(value);
                }
              }}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
              <Button variant="outlined" onClick={handleBackToLogin}>
                Voltar
              </Button>
              <Button variant="contained" color="primary" onClick={handleCreateUser}>
                Criar
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default LoginForm;
