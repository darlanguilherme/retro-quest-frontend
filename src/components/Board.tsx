import Column from './Column';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Divider, Typography, IconButton, CircularProgress, Button } from '@mui/material';

import { getBoardDetailsById } from '../services/apiService';
import { joinBoard, onCardAdded, onCardLiked, onBoardFinished, addCardWS, finishBoardWS, socket, likeCard } from '../socket/socket.service';
import { BoardDTO, CardDTO } from '../dtos/entitys.interface';
import { useUser } from '../context/UserContext';

interface BoardProps {
    board: any;
    onBack: () => void;
}

interface Card {
    text: string;
    likes: number;
    userLiked: boolean;
}

const Board: React.FC<BoardProps> = ({ board, onBack }) => {
    const [columns, setColumns] = useState<{ title: string; id: number }[]>([
        { title: 'O que deu certo', id: 1 },
        { title: 'O que não deu certo', id: 2 },
        { title: 'O que podemos melhorar?', id: 3 },
    ]);

    const { user, setUser } = useUser();
    const [boardData, setBoardData] = useState<BoardDTO>();
    const [loading, setLoading] = useState(false); // Estado de loading

    useEffect(() => {
        getBoardDetails();

        return () => {
            console.log("Remover o listener se necessário")
            // Remover o listener se necessário
            socket.off('cardAdded');
            socket.off('cardLiked');
        };
    }, []);

    // Junta-se ao board e configura o listener para novos cards
    useEffect(() => {
        if (boardData) {
            console.log("CONECTADO NA SALA", `board_${boardData.id}`)
            joinBoard(`board_${boardData.id}`);

            onCardAdded((card) => {
                console.log('New card added:', card);
                setBoardData(prevBoardData => {
                    if (!prevBoardData) return prevBoardData;

                    // Verifica se o cartão já existe
                    const cardExists = prevBoardData.cards.some(existingCard => existingCard.id === card.id);

                    if (!cardExists) {
                        return {
                            ...prevBoardData,
                            cards: [...prevBoardData.cards, card]
                        };
                    } else {
                        console.log('Card already exists:', card);
                        return prevBoardData; // Retorna os dados anteriores sem alteração
                    }
                });
            });

            onCardLiked((card: CardDTO) => {
                console.log('New card Liked:', card);
                setBoardData(prevBoardData => prevBoardData ? {
                    ...prevBoardData,
                    cards: prevBoardData.cards.map(c => c.id === card.id ? card : c)
                } : prevBoardData);
            });

            onBoardFinished((boardId: number) => {
                console.log('onBoardFinished', boardId);
                setBoardData(prevBoardData => prevBoardData ? {
                    ...prevBoardData,
                    isActive: false
                } : prevBoardData);
            });
        }
    }, [boardData]);

    const getBoardDetails = async () => {
        setLoading(true);
        try {
            const data = await getBoardDetailsById(board.id);
            console.log("DETALHES DO BOARD:", data)
            setBoardData(data);
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

    const userLikedBefore = (cardId: number, userId: number) => {
        // Verifica se o usuário já curtiu o card
        return boardData?.cards?.some(
            (card) => card.id === cardId && card.likes.some(
                (like) => like.userId === userId));
    }

    const updateCardLikes = (cardId: number, userId: number) => {
        console.log(`Like para o card ${cardId} pelo usuário ${userId}`);
        likeCard(cardId, userId);
    };

    // const handleFinishRetro = async () => {
    //     console.log('Finalizando a retro');
    //     await finishRetro(boardData?.id);
    // }

    return (
        <Container sx={{ paddingRight: '0px !important', paddingLeft: '0px !important', margin: 0, height: 'calc(100% - 50px)', width: '100%', maxWidth: 'none !important' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <><Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: '10px !important',
                        paddingBottom: '10px !important',
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
                            sx={{ marginLeft: 2 }}
                            disabled={!boardData?.isActive}
                        >
                            Finalizar
                        </Button>)}
                </Box><Box sx={{ display: 'flex', height: '100%', justifyContent: 'space-around' }}>
                        {columns.map((column, columnIndex) => (
                            <React.Fragment key={columnIndex}>
                                <Column
                                    title={column.title}
                                    cards={boardData?.cards?.filter(b => b.columnId === column.id) || []}
                                    boardActive={boardData?.isActive}
                                    onAddCard={(text, userId) => addCard(userId, column.id, text)}
                                    onLikeCard={(cardId, userId) => updateCardLikes(cardId, userId)} />
                                {columnIndex < columns.length - 1 && (
                                    <Divider sx={{ borderWidth: 1 }} />
                                )}
                            </React.Fragment>
                        ))}
                    </Box></>
            )}
        </Container>
    );
};

export default Board;
