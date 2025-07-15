import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Container,
    Typography,
    Paper,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress, // Importar CircularProgress
} from '@mui/material';
import Board from './Board';  // Importe seu componente Board
import { getBoards, createBoard } from '../services/apiService';
import { useUser } from '../context/UserContext';

const BoardList: React.FC = () => {
    const { user, setUser } = useUser();
    const [boardData, setBoardData] = useState<any[]>([]);
    const [selectedBoard, setSelectedBoard] = useState<any | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [open, setOpen] = useState(false); // Para controle do modal
    const [newBoardTitle, setNewBoardTitle] = useState(''); // Para o título da nova retro
    const [loading, setLoading] = useState(false);

    const itemsPerPage = 10;

    useEffect(() => {
        getBoardData();
    }, []);

    useEffect(() => {
        setTotalPage(Math.ceil(boardData.length / itemsPerPage));
    }, [itemsPerPage, boardData]);

    const getBoardData = async () => {
        setLoading(true);
        try {
            const data = await getBoards();
            setBoardData(data);
        } catch (error) {
            console.error('Erro ao buscar dados do board:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBoardClick = (board: any) => {
        setSelectedBoard(board);
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

    const handleBack = () => {
        setSelectedBoard(null);
    };

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setNewBoardTitle('');
    };

    const handleSave = async () => {
        await createBoard({ title: newBoardTitle });
        getBoardData();
        handleCloseModal();
    };

    if (selectedBoard !== null) {
        return <Board board={selectedBoard} onBack={handleBack} />;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBoards = boardData.slice(startIndex, endIndex);

    return (
        <Container sx={{ margin: 0, width: '100%', maxWidth: 'none !important' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '10px !important',
                    paddingBottom: '10px !important',
                    height: '50px',
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 0 }} gutterBottom>
                    Selecione a Retro
                </Typography>
                {user.role === 'ADMIN' && (
                    <Button
                        variant="contained"
                        onClick={handleOpenModal}
                        sx={{ marginLeft: 2, height: '30px' }}
                    >
                        Nova retro
                    </Button>)
                }
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Paper sx={{ width: '100%', height: '500px' }}>
                        <List sx={{ padding: 0 }}>
                            {paginatedBoards.map(board => (
                                <ListItem
                                    key={board.id}
                                    onClick={() => handleBoardClick(board)}
                                    sx={{ '&:hover': { backgroundColor: 'lightgray', cursor: 'pointer' }, borderBottom: '1px solid #ddd' }}
                                >
                                    <ListItemText primary={`${board.id}: ${board.title}`} />
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
            )}

            {/* Modal para nova retro */}
            <Dialog open={open} onClose={handleCloseModal}>
                <DialogTitle>Nova retro</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Título"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newBoardTitle}
                        onChange={(e) => setNewBoardTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BoardList;
