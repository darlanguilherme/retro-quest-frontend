// User DTO
export interface UserDTO {
    id: number;
    username: string;
    role: string;
    lvl: number;
    experience: number;
    avatarUrl?: string; // Opcional
}

// Board DTO
export interface BoardDTO {
    id: number;
    title: string;
    isActive: boolean;
    mvpSelected: string;
    cards: CardDTO[]; 
    mvps: any;
    createdAt: string;
}

// Card DTO
export interface CardDTO {
    id: number;
    description: string;
    boardId: number;
    columnId: number; // Pode renomear para ColumnId se necessário
    creatorId: number; // ID do criador
    likes: CardLikeDTO[]; // Para incluir informações de likes se necessário
    createdAt: string; // Usar string para datas no formato ISO
}

// CardLike DTO
export interface CardLikeDTO {
    id: number;
    cardId: number;
    userId: number;
    createdAt: string; // Usar string para datas no formato ISO
}

// Exemplo de um DTO de resposta que pode incluir múltiplos cards
export interface BoardWithCardsDTO {
    board: BoardDTO;
    cards: CardDTO[];
}
