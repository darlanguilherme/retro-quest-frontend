import { io } from 'socket.io-client';
import { CardDTO } from '../dtos/entitys.interface';

export const socket = io('http://localhost:3003'); // URL do seu servidor

export const joinBoard = (boardId: string) => {
  console.log('joinBoard', boardId)
  socket.emit('joinBoard', boardId);
};

export const addCardWS = (card: Partial<CardDTO>) => {
  console.log('addCard', card)
  socket.emit('addCard', card);
};

export const likeCard = (cardId: number, userId: number) => {
  console.log('likeCard', cardId, userId)
  socket.emit('likeCard', { cardId, userId });
};

export const onCardAdded = (callback: (card: any) => void) => {
  console.log('onCardAdded')
  socket.on('cardAdded', callback);
};

export const onCardLiked = (callback: (card: CardDTO) => void) => {
  console.log('onCardLiked')
  socket.on('cardLiked', callback);
};

socket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
});
