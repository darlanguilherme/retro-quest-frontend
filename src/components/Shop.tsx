import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { getAvatarsShop, purchaseAvatars } from '../services/apiService';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';


const Shop: React.FC = () => {
  const { user, setUser } = useUser();
  const [selectedAvatars, setSelectedAvatars] = useState<number[]>([]);
  const [purchasedAvatars, setPurchasedAvatars] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');

  interface Avatar {
    id: number;
    path: string;
    itemValue: number;
  }

  const [avatars, setAvatars] = useState<Avatar[]>([]);

  useEffect(() => {
    getAvatars();
  }, []);

  const getAvatars = async () => {
    const response = await getAvatarsShop();
    setAvatars(response);
    setPurchasedAvatars(response
      .filter((avatar: any) => avatar.users.length > 0)
      .map((avatar: any) => avatar.id)
    );
  };

  const handleAvatarSelect = (id: number) => {
    // Não permite selecionar avatares já comprados
    if (!purchasedAvatars.includes(id)) {
      setSelectedAvatars((prev) =>
        prev.includes(id) ? prev.filter((avatarId) => avatarId !== id) : [...prev, id]
      );
    }
  };

  const handlePurchase = async () => {
    try {
      const totalCost = selectedAvatars.reduce((total, id) => {
        const avatar = avatars.find((avatar) => avatar.id === id);
        return total + (avatar ? avatar.itemValue : 0);
      }, 0);

      if (totalCost <= user.coins) {
        const response = await purchaseAvatars(selectedAvatars);
        console.log("RESPONSE: ", response)

        setUser((prev: any) => ({ ...prev, coins: response.coins }));
        setPurchasedAvatars((prev) => [...prev, ...selectedAvatars]);
        setMessage(`Você comprou ${selectedAvatars.length} avatares com sucesso!`);
        setSelectedAvatars([]);
      } else {
        setMessage('Você não tem moedas suficientes para comprar esses avatares.');
      }
    } catch (error) {
      toast.error('Erro ao comprar os avatares.');
      console.log('Erro ao comprar os avatares.', error);
    }
  };

  const totalCost = selectedAvatars.reduce((total, id) => {
    const avatar = avatars.find((avatar) => avatar.id === id);
    return total + (avatar ? avatar.itemValue : 0);
  }, 0);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Loja de Avatares
          </Typography>
          <Typography variant="h6" gutterBottom>
            Saldo: {user.coins} coins
          </Typography>
          <Typography variant="body1" gutterBottom>
            Total no Carrinho: {totalCost} coins
          </Typography>
        </Box>

        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePurchase}
            disabled={selectedAvatars.length === 0}
          >
            Comprar Selecionados
          </Button>
          {message && (
            <Typography variant="body2" sx={{ marginTop: 2, color: 'green' }}>
              {message}
            </Typography>
          )}
        </Box>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        {avatars.map((avatar) => (
          <Grid item xs={12} sm={6} md={2} key={avatar.id}>
            <Card
              sx={{
                paddingTop: 2,
                height: '190px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: purchasedAvatars.includes(avatar.id) ? 'default' : 'pointer',
                border: selectedAvatars.includes(avatar.id)
                  ? '2px solid blue'
                  : purchasedAvatars.includes(avatar.id)
                    ? '2px solid green'
                    : 'none',
                backgroundColor: purchasedAvatars.includes(avatar.id) ? '#e0ffe0' : 'white',
                transition: 'transform 0.2s',
                '&:hover': !purchasedAvatars.includes(avatar.id) ? { transform: 'scale(1.05)' } : {},
              }}
              onClick={() => handleAvatarSelect(avatar.id)}
            >
              <CardMedia
                component="img"
                image={`/images/${avatar.path}`}
                alt={`Avatar ${avatar.id}`}
                sx={{ width: 100, height: 100 }}
              />
              <CardContent>
                <Typography variant="body1">{`Preço: ${avatar.itemValue} coins`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Shop;
