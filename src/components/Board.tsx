import React, { useState } from 'react';
import Column from './Column';
import { Box, Container, Divider } from '@mui/material';

const Board: React.FC = () => {
    const [columns, setColumns] = useState<{ title: string, cards: string[] }[]>([
        { title: 'O que deu certo', cards: ['oi','oi','oi','oi','oi','oi','oi','oi','oi','oi','oi','oi','oi'] },
        { title: 'O que não deu certo', cards: [] },
        { title: 'O que podemos melhorar?', cards: [] },
    ]);

    const addCard = (columnIndex: number, text: string) => {
        const newColumns = [...columns];
        newColumns[columnIndex].cards.push(text);
        setColumns(newColumns);
    };

    return (
        <Container sx={{ padding: '0 !important', height: '100%', }}>
            <Box sx={{ display: 'flex', height: '100%', justifyContent: 'space-around' }}>
                {columns.map((column, index) => (
                    <React.Fragment key={index}>
                        <Column
                            title={column.title}
                            cards={column.cards}
                            onAddCard={(text) => addCard(index, text)}
                        />
                        {index < columns.length - 1 && (
                            <Divider
                                sx={{ borderWidth: 1 }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </Container>
    );
};

export default Board;
