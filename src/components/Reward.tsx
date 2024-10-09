import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
} from '@mui/material';
import { getRewards, rendeenReward } from '../services/apiService';
import { useUser } from '../context/UserContext';
import { formatLvl } from '../utils/Utils';
import ConfettiExplosion from 'react-confetti-explosion';
import { toast } from 'react-toastify';

const Reward: React.FC<any> = ({ userLevel, userName, userAvatar }) => {
  const { user } = useUser();
  const [rewards, setRewards] = useState<any[]>([]);
  const [explosion, setExplosion] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    findRewards();
  }, []);

  const findRewards = async () => {
    const response = await getRewards();
    setRewards(response);
  };

  const handleRedeem = async (rewardId: number) => {
    try {
      if (buttonDisabled) return;

      setButtonDisabled(true);
      // setRewards((prev) =>
      //   prev.map((reward) =>
      //     reward.lvlRequired === lvlRequired && reward.unlocked
      //       ? { ...reward, redeemed: true }
      //       : reward
      //   )
      // );

      const rewardRendeed = await rendeenReward(rewardId);

      if (!rewardRendeed) {
        toast.error('Erro ao resgatar recompensa.');
        return;
      }
      
      setRewards((prev) =>
        prev.map(({ id, ...rest }) =>
          id === rewardId ? rewardRendeed : { id, ...rest }
        )
      );

      console.log('rewards:', rewards);
      toast.success('Recompensa resgatada com sucesso!');
      setExplosion(true);
    } catch (error) {
      toast.error('Erro ao resgatar recompensa.');
      console.log('Erro ao resgatar recompensa:', error);
    }

  };

  const handleAnimationEnd = () => {
    setExplosion(false);
    setButtonDisabled(false);
  };

  return (
    <Box sx={{ display: 'flex', padding: 2, position: 'relative', height: '100vh' }}>
      {explosion && (
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Centraliza a animação
            zIndex: 9999, // Certifique-se de que a animação está na frente de outros elementos
          }}
        >
          <ConfettiExplosion
            duration={1900}
            particleCount={60}
            onComplete={handleAnimationEnd}
            width={1500}
          />
        </Box>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          Recompensas
        </Typography>

        <Grid container spacing={2}>
          {rewards.map((reward) => (
            <Grid item xs={6} sm={3} key={reward.id}>
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: formatLvl(user.experience) >= reward.lvlRequired
                    ? (reward.userReward.length > 0 ? '#81c784' : '#64b5f6')
                    : '#ef5350',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Avatar
                  src={reward?.avatar?.path ? '/images/' + reward?.avatar?.path : '/images/coin.png'}
                  sx={{ width: 80, height: 80, marginBottom: 1 }}
                />
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {reward?.avatar?.path ? reward.title : `${reward.value} moedas`}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>{`Level ${reward.lvlRequired}`}</Typography>
                {formatLvl(user.experience) >= reward.lvlRequired && reward.userReward.length < 1 && (
                  <Button
                    variant="contained"
                    onClick={() => handleRedeem(reward.id)}
                    disabled={buttonDisabled}
                    sx={{ marginTop: 1, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#0d47a1' } }}
                  >
                    Resgatar
                  </Button>
                )}
                {reward.userReward.length > 0 && (
                  <Typography variant="body2" sx={{ color: 'white', marginTop: 1 }}>
                    Resgatado
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Reward;
