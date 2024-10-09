import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar, LinearProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { getUsersRanking } from '../services/apiService';
import { formatLvl, getMaxLevel } from '../utils/Utils';
import { useUser } from '../context/UserContext';

const calculateProgress = (experience: number) => {
  return (experience / getMaxLevel(experience)) * 100;
};

const Ranking = () => {
  interface User {
    avatarId: any;
    id: number;
    name: string;
    level: number;
    experience: number;
    date: string;
    nickname: string;
    avatar: any;
  }

  const { user, setUser } = useUser();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getRanking();
  }, []);

  const getRanking = async () => {
    const users = await getUsersRanking();
    setUsers(users);
  };

  // Ordena os usuários por experiência em ordem decrescente
  const sortedUsers = users.sort((a, b) => b.experience - a.experience);

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Ranking de Usuários
      </Typography>
      <List>
        {sortedUsers.map((userRanking, index) => {
          // Define o estilo para os primeiros três lugares
          const isTopThree = index < 3;
          return (
            <ListItem
              key={userRanking?.id}
              sx={{
                padding: 1,
                borderBottom: '1px solid #ccc',
                backgroundColor: isTopThree ? (index === 0 ? 'rgba(255, 215, 0, 0.5)' : index === 1 ? 'rgba(192, 192, 192, 0.4)' : 'rgba(205, 127, 50, 0.3)') : 'transparent',
                borderRadius: 1,
                border: userRanking.avatar?.id === user.avatarId ? '1px solid red' : 'none'
              }}
            >
              <Avatar
                src={'/images/' + userRanking.avatar?.path}
                sx={{
                  marginRight: 2,
                  width: 60,
                  height: 60,
                  border: userRanking.avatar?.id === user.avatarId ? '3px solid red' : 'none'
                }}
              />
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" sx={{ marginRight: 1 }}>
                      #{index + 1} {userRanking.nickname}
                    </Typography>
                    <StarIcon sx={{ color: 'gold', fontSize: 20 }} />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2">{`Level: ${formatLvl(userRanking.experience)}`}</Typography>
                    <LinearProgress variant="determinate" value={calculateProgress(userRanking.experience)} />
                  </Box>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Ranking;
