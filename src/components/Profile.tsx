import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Avatar, Grid } from '@mui/material';
import { updateUser } from '../services/apiService';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import { getAvatarsUser } from '../services/apiService';

const Profile = () => {
  const { user, setUser } = useUser();

  const [nickname, setNickname] = useState(user.nickname || '');
  const [username, setUsername] = useState(user.username || '');
  const [password, setPassword] = useState(user.password || '');
  const [idAvatarSelected, setIdAvatarSelected] = useState(user.avatar?.id || '');

  interface Avatar {
    avatar: any;
    id: number;
    path: string;
  }

  const [avatarsToSelect, setAvatarsToSelect] = useState<Avatar[]>([]);

  useEffect(() => {
    getAvatars();
  }, []);

  const getAvatars = async () => {
    try {
      const avatarsUser = await getAvatarsUser();
      console.log("Avatas do usuario: ", avatarsUser)
      setAvatarsToSelect(avatarsUser);
    } catch (error) {
      console.error('Erro ao buscar avatares:', error);
    }
  };

  const handleAvatarSelect = (selectedAvatarId: number) => {
    setIdAvatarSelected(selectedAvatarId);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData = {
      nickname,
      username,
      password,
      avatarId: idAvatarSelected,
    };

    try {
      const updatedUser = await updateUser(userData);
      setUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ textAlign: 'center' }} variant="h5" gutterBottom>
            Editar Perfil
          </Typography>
          <Grid sx={{ marginTop: '15px', marginLeft: '30px', marginRight: '30px' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nome de Exibição"
                fullWidth
                margin="normal"
                value={nickname}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 15) {
                    setNickname(value);
                  }
                }}
              />
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
            </form>
            <Box sx={{ display: 'flex', justifyContent: 'start', mt: 6 }}>
              <Button sx={{ width: '160px' }} variant="contained" color="primary" onClick={handleSubmit}>
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ textAlign: 'center' }} variant="h5" gutterBottom>
            Selecione seu Avatar
          </Typography>
          <Grid sx={{ marginTop: '15px' }} container spacing={3}>
            {avatarsToSelect.map((avatarUser) => (
              <Grid item key={avatarUser.avatar?.id} xs={4} sm={4} md={3}>
                <Avatar
                  src={'/images/' + avatarUser.avatar?.path}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    cursor: 'pointer',
                    border: avatarUser?.avatar.id === idAvatarSelected ? '2px solid blue' : 'none',
                  }}
                  onClick={() => handleAvatarSelect(avatarUser?.avatar.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
};

export default Profile;
