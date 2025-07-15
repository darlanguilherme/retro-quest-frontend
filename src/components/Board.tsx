import Column from './Column';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useUser } from '../context/UserContext';
import { BoardDTO, CardDTO } from '../dtos/entitys.interface';
import { getBoardDetailsById, voteMvp, getAllUsers } from '../services/apiService';

import {
    Box,
    Container,
    Divider,
    Typography,
    IconButton,
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar
} from '@mui/material';
import {
    joinBoard,
    onCardAdded,
    onCardLiked,
    onBoardFinished,
    addCardWS,
    finishBoardWS,
    socket,
    likeCard
} from '../socket/socket.service';

interface BoardProps {
    board: any;
    onBack: () => void;
}

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

const Board: React.FC<BoardProps> = ({ board, onBack }) => {
    const [columns, setColumns] = useState<{ title: string; id: number }[]>([
        { title: 'O que deu certo', id: 1 },
        { title: 'O que não deu certo', id: 2 },
        { title: 'O que podemos melhorar?', id: 3 },
    ]);

    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [boardData, setBoardData] = useState<BoardDTO>();
    const [isMvpModalOpen, setIsMvpModalOpen] = useState(false);
    const [mvpUserId, setMvpUserId] = useState<number | null>(null);
    const [userHasVoted, setUserHasVoted] = useState<boolean | null>(null);

    useEffect(() => {
        getBoardDetails();

        return () => {
            socket.off('cardAdded');
            socket.off('cardLiked');
        };
    }, []);

    useEffect(() => {
        if (boardData) {
            joinBoard(`board_${boardData.id}`);

            onCardAdded((card) => {
                setBoardData(prevBoardData => {
                    if (!prevBoardData) return prevBoardData;

                    const cardExists = prevBoardData.cards.some(existingCard => existingCard.id === card.id);

                    if (!cardExists) {
                        return {
                            ...prevBoardData,
                            cards: [...prevBoardData.cards, card]
                        };
                    }
                    return prevBoardData;
                });
            });

            onCardLiked((card: CardDTO) => {
                setBoardData(prevBoardData => prevBoardData ? {
                    ...prevBoardData,
                    cards: prevBoardData.cards.map(c => c.id === card.id ? card : c)
                } : prevBoardData);
            });

            onBoardFinished((boardId: number) => {
                setBoardData(prevBoardData => prevBoardData ? {
                    ...prevBoardData,
                    isActive: false
                } : prevBoardData);
            });
            const x = boardData?.mvps.some((mvp: { userVoted: any; }) => mvp.userVoted === user.id);
            console.log("XXX")
            console.log(x)
            setUserHasVoted(x);
        }
    }, [boardData]);

    const getBoardDetails = async () => {
        setLoading(true);
        try {
            const data = await getBoardDetailsById(board.id);
            setBoardData(data);

            const users = await getAllUsers();
            setUsers(users);

            // const x = await boardData?.mvps.some((mvp: { userVoted: any; }) => mvp.userVoted === user.id);
            // console.log("XXX")
            // console.log(x)
            // setUserHasVoted(x);
        } catch (error) {
            console.error('Erro ao buscar dados do board:', error);
        } finally {
            setLoading(false);
        }
    };

    const addCard = (userId: number, columnId: number, description: string) => {
        if (boardData?.id) {
            addCardWS({
                boardId: boardData.id,
                creatorId: userId,
                columnId,
                description,
            });
        }
    };

    const handleFinishRetro = () => {
        if (boardData?.id) {
            finishBoardWS(boardData?.id);
        }
    };

    const updateCardLikes = (cardId: number, userId: number) => {
        likeCard(cardId, userId);
    };

    const handleOpenMvpModal = () => setIsMvpModalOpen(true);
    const handleCloseMvpModal = () => setIsMvpModalOpen(false);

    const handleSelectMvp = async (userWasVoted: number) => {
        await voteMvp({ boardId: boardData?.id, userWasVoted });
        setMvpUserId(userWasVoted);
        setUserHasVoted(true);
        handleCloseMvpModal();
    };

    return (
        <Container sx={{ paddingRight: '0px !important', paddingLeft: '0px !important', margin: 0, height: 'calc(100% - 50px)', width: '100%', maxWidth: 'none !important' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingTop: '15px !important',
                            paddingBottom: '15px !important',
                            height: '50px'
                        }}
                    >
                        <IconButton onClick={onBack} sx={{ marginRight: 1 }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h5" sx={{ marginBottom: 0 }} gutterBottom>
                            {`${boardData?.id}: ${boardData?.title}`}
                        </Typography>

                        {user.role === 'ADMIN' && (
                            <Button
                                variant="contained"
                                onClick={handleFinishRetro}
                                sx={{ marginLeft: 2, height: '30px !important' }}
                                disabled={!boardData?.isActive}
                            >
                                Finalizar
                            </Button>
                        )}

                        {boardData?.isActive ? (
                            !userHasVoted ? (
                                <Button
                                    variant="outlined"
                                    onClick={handleOpenMvpModal}
                                    sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '45px', height: '30px' }}
                                >
                                    Indicar MVP
                                </Button>
                            ) : null
                        ) : boardData?.mvpSelected ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: '45px' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginRight: '10px' }}>
                                    Destaque:
                                </Typography>

                                {(JSON.parse(boardData?.mvpSelected) || []).map((userId: number) => {
                                    const user = users.find(p => p.id === userId);
                                    return user ? (
                                        <Box key={user.id} sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                            <Avatar
                                                src={'/images/' + (user.avatar?.path || '')}
                                                sx={{ width: 32, height: 32, marginRight: 1 }}
                                            />
                                            <Typography variant="subtitle1">{user.nickname}</Typography>
                                        </Box>
                                    ) : null;
                                })}
                            </Box>

                        ) : null}
                    </Box>

                    <Box sx={{ display: 'flex', height: '100%', justifyContent: 'space-around' }}>
                        {columns.map((column, columnIndex) => (
                            <React.Fragment key={columnIndex}>
                                <Column
                                    title={column.title}
                                    cards={boardData?.cards?.filter(b => b.columnId === column.id) || []}
                                    boardActive={boardData?.isActive}
                                    onAddCard={(text, userId) => addCard(userId, column.id, text)}
                                    onLikeCard={(cardId, userId) => updateCardLikes(cardId, userId)}
                                />
                                {columnIndex < columns.length - 1 && (
                                    <Divider sx={{ borderWidth: 1 }} />
                                )}
                            </React.Fragment>
                        ))}
                    </Box>

                    {/* MVP Modal */}
                    <Dialog
                        open={isMvpModalOpen}
                        onClose={handleCloseMvpModal}
                        sx={{
                            '& .MuiDialog-paper': {
                                width: '400px',
                                maxWidth: '90vw',
                                height: '500px',
                                maxHeight: '80vw',
                                backgroundColor: '#f9f9f9', // fundo mais claro
                                color: '#333', // texto escuro
                                borderRadius: 3,
                                boxShadow: 6,
                            },
                        }}
                    >
                        <DialogTitle sx={{
                            backgroundColor: '#5478F0',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            paddingY: 2,
                            paddingX: 3,
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                        }}>
                            Selecione o destaque
                        </DialogTitle>
                        <DialogContent sx={{
                            padding: '10px !important'
                        }}>
                            <List>
                                {users.map((user) => {
                                    const isSelected = mvpUserId === user.id;
                                    return (
                                        <ListItem key={user.id} disablePadding>
                                            <Button
                                                fullWidth
                                                onClick={() => setMvpUserId(user.id)}
                                                sx={{
                                                    justifyContent: 'flex-start',
                                                    textTransform: 'none',
                                                    padding: 1,
                                                    borderRadius: 2,
                                                    marginBottom: 1,
                                                    height: '60px',
                                                    backgroundColor: isSelected ? '#5478F0' : '#fff',
                                                    color: isSelected ? '#fff' : '#333',
                                                    '&:hover': {
                                                        backgroundColor: isSelected
                                                            ? '#5478F0'
                                                            : '#f0f0f0',
                                                    },
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={'/images/' + user.avatar?.path}
                                                        sx={{
                                                            marginRight: 2,
                                                            width: 50,
                                                            height: 50,
                                                        }}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={user.nickname}
                                                    primaryTypographyProps={{
                                                        fontWeight: isSelected ? 'bold' : 'normal',
                                                    }}
                                                />
                                            </Button>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </DialogContent>
                        <DialogActions sx={{ padding: '15px' }}>
                            <Button onClick={handleCloseMvpModal} sx={{ height: '30px' }}>Cancelar</Button>
                            <Button
                                onClick={() => handleSelectMvp(mvpUserId!)}
                                disabled={mvpUserId === null}
                                variant="contained"
                                sx={{ height: '30px' }}
                            >
                                Confirmar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )
            }
        </Container >
    );
};

export default Board;
