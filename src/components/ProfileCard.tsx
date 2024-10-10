import React from 'react';
import { Box, Typography, Avatar, LinearProgress, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh'; // Ícone de refresh
import { calculateProgressBar } from '../utils/Utils';

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    position: 'relative'
}));

const ExperienceBar = styled(LinearProgress)(({ theme }) => ({
    '& .MuiLinearProgress-bar': {
        backgroundColor: '#5478F0',
    },
    width: '100%',
    marginTop: theme.spacing(1),
}));

const UserProfileCard = ({
    avatarSrc,
    nickname,
    level,
    experience,
    maxExperience,
    coins,
    onRefresh
}: {
    avatarSrc: string;
    nickname: string;
    level: number;
    experience: number;
    maxExperience: number;
    coins: number;
    onRefresh: () => void;
}) => {
    return (
        <StyledPaper>
            <Box sx={{ position: 'relative' }}>
                <Avatar src={'/images/' + avatarSrc} sx={{ width: 80, height: 80, mb: 2 }} />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 60,
                        right: -7,
                        bgcolor: 'white',
                        boxShadow: 1,
                        '&:hover': {
                            bgcolor: 'grey.200'
                        },
                        width: '30px',
                        height: '30px',
                    }}
                    onClick={onRefresh}
                >
                    <RefreshIcon />
                </IconButton>
            </Box>
            <Typography variant="h6" sx={{ textAlign: 'center' }} component="div" gutterBottom>
                {nickname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Level {level} | Coins: {coins}
            </Typography>
            <ExperienceBar
                variant="determinate"
                value={calculateProgressBar(experience)}
                sx={{ mt: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
                {experience} / {maxExperience} XP
            </Typography>
        </StyledPaper>
    );
};

export default UserProfileCard;
