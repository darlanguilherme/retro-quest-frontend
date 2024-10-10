import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, IconButton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { CardDTO, UserDTO } from '../dtos/entitys.interface';

interface ColumnProps {
    title: string;
    cards: CardDTO[];
    boardActive: boolean | undefined;
    onAddCard: (text: string, userId: number) => void;
    onLikeCard: (cardId: number, userId: number) => void;
}

const Column: React.FC<ColumnProps> = ({ title, cards, boardActive, onAddCard, onLikeCard }) => {
    const [newCardDescription, setNewCardDescription] = useState('');
    const [user, setUser] = useState<UserDTO | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        setUser(userData ? JSON.parse(userData) : null);
    }, []);

    const handleAddCard = () => {
        if (newCardDescription.trim() && user) {
            setNewCardDescription('');
            onAddCard(newCardDescription, user.id);
        }
    };

    const handleLike = (cardId: number, userId: number) => {
        onLikeCard(cardId, userId);
    };

    // Ordena os cartões por número de likes
    const sortedCards = [...cards].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '33%',
                height: '100%',
                borderRadius: 1,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    padding: 1,
                    borderBottom: '1px solid #ddd',
                    backgroundColor: '#f5f5f5',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6">{title}</Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    padding: 1,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                    }}
                >
                    {sortedCards.map((card, index) => (
                        <Box
                            key={index}
                            sx={{
                                padding: 1,
                                borderBottom: '1px solid #ddd',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                                borderRadius: 1,
                                marginBottom: 1,
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'normal',
                                    flex: 1,
                                }}
                            >
                                {card.description}
                            </Typography>
                            <IconButton
                                onClick={() => user && handleLike(card.id, user.id)}
                                sx={{
                                    color: user && card.likes?.some(c => c.userId === user.id) ? 'blue' : 'gray',
                                    marginLeft: 1,
                                }}
                                disabled={!boardActive}
                            >
                                <ThumbUpIcon />
                            </IconButton>
                            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                                {card.likes?.length}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    padding: 1,
                    borderTop: '1px solid #ddd',
                    backgroundColor: '#f9f9f9',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <TextField
                    value={newCardDescription}
                    onChange={(e) => setNewCardDescription(e.target.value)}
                    placeholder="Adicionar um card"
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputProps={{ maxLength: 120 }}
                    disabled={!boardActive}
                />
                <Button
                    onClick={handleAddCard}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 1 }}
                    disabled={!boardActive}
                >
                    Adicionar
                </Button>
            </Box>
        </Box>
    );
};

export default Column;
