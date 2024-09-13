import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Container, Typography, Paper, Box, Button } from '@mui/material';
import Board from './Board';  // Importe seu componente Board

// Dados fictícios para os boards
const boardData = [
    { id: 1, name: 'Retro 1: 01/08/2024' },
    { id: 2, name: 'Retro 2: 08/08/2024' },
    { id: 3, name: 'Retro 3: 15/08/2024' },
    // Adicione mais dados aqui para testar a paginação
];

const BoardList: React.FC = () => {
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const itemsPerPage = Math.floor(window.innerHeight / 60); // Assume 60px por item

    const handleBoardClick = (id: number) => {
        setSelectedBoardId(id);
    };

    const handlePageChange = (direction: 'prev' | 'next') => {
        setCurrentPage(prevPage => {
            const totalPages = Math.ceil(boardData.length / itemsPerPage);
            if (direction === 'next' && prevPage < totalPages) {
                return prevPage + 1;
            }
            if (direction === 'prev' && prevPage > 1) {
                return prevPage - 1;
            }
            return prevPage;
        });
    };

    if (selectedBoardId !== null) {
        return <Board boardId={selectedBoardId} />;
    }

    // Calcula os índices dos itens a serem exibidos na página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBoards = boardData.slice(startIndex, endIndex);

    return (
        <Container sx={{ padding: '20px !important', margin: 0, width: '100%', maxWidth: 'none !important' }}>
            <Typography variant="h5" gutterBottom>
                Selecione a Retro
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Paper sx={{ width: '100%', height: '500px' }}>
                    <List>
                        {paginatedBoards.map(board => (
                            <ListItem
                                key={board.id}
                                onClick={() => handleBoardClick(board.id)}
                                sx={{ '&:hover': { backgroundColor: 'lightgray', cursor: 'pointer' }, borderBottom: '1px solid #ddd' }}
                            >
                                <ListItemText primary={board.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: 1
                }}>
                    <Button
                        variant="contained"
                        onClick={() => handlePageChange('prev')}
                        disabled={currentPage === 1}
                        sx={{
                            height: '35px',
                            bgcolor: 'primary.main',
                            '&:hover': { bgcolor: 'primary.dark' },
                            paddingX: 3,
                            paddingY: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '0.875rem'
                        }}
                    >
                        Anterior
                    </Button>
                    <Typography variant="body1" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                        Página {currentPage} de {totalPage}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => handlePageChange('next')}
                        disabled={currentPage === totalPage}
                        sx={{
                            height: '35px',
                            bgcolor: 'primary.main',
                            '&:hover': { bgcolor: 'primary.dark' },
                            paddingX: 3,
                            paddingY: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '0.875rem'
                        }}
                    >
                        Próxima
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default BoardList;
