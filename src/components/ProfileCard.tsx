import React from 'react';
import { Box, Typography, Avatar, LinearProgress, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Estilização do contêiner principal
const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    width: '100%',
    height: '100%',
    boxShadow:'none'
  }));

// Estilização da barra de experiência
const ExperienceBar = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const UserProfileCard = ({ avatarUrl, nickname, level, experience, maxExperience }: { avatarUrl: string; nickname: string; level: number; experience: number; maxExperience: number }) => {
  // Cálculo do progresso da barra de experiência
  const experiencePercentage = (experience / maxExperience) * 100;

  return (
    <StyledPaper>
      <Avatar src={avatarUrl} sx={{ width: 80, height: 80, mb: 2 }} />
      <Typography variant="h6" component="div" gutterBottom>
        {nickname}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Level {level}
      </Typography>
      <ExperienceBar
        variant="determinate"
        value={experiencePercentage}
        sx={{ mt: 1 }}
      />
      <Typography variant="caption" color="text.secondary">
        {experience} / {maxExperience} XP
      </Typography>
    </StyledPaper>
  );
};

export default UserProfileCard;
