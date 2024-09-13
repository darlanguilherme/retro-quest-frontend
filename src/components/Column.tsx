import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface ColumnProps {
    title: string;
    cards: string[];
    onAddCard: (text: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, cards, onAddCard }) => {
    const [newCardText, setNewCardText] = useState('');

    const handleAddCard = () => {
        if (newCardText.trim()) {
            onAddCard(newCardText);
            setNewCardText('');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width:'33%',
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
                }}
            >
                <h3>{title}</h3>
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
                    {cards.map((card, index) => (
                        <Box
                            key={index}
                            sx={{
                                padding: 1,
                                borderBottom: '1px solid #ddd',
                            }}
                        >
                            {card}
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
                    value={newCardText}
                    onChange={(e) => setNewCardText(e.target.value)}
                    placeholder="Adicionar um card"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <Button
                    onClick={handleAddCard}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 1 }}
                >
                    Adicionar
                </Button>
            </Box>
        </Box>
    );
};

export default Column;
