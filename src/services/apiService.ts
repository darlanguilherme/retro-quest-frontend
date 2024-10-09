import axios from 'axios';
import { BoardDTO } from '../dtos/entitys.interface';

const API_URL = 'http://localhost:3003/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 60000,
});

// Defina a interface para os dados
export interface Data {
    id: number;
    name: string;
}

export const login = async (data: any): Promise<any> => {
    try {
        const response = await api.post<any>('/auth/login', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        throw error;
    }
};

export const createUser = async (data: any): Promise<Data> => {
    try {
        const response = await api.post<any>('/users', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        throw error;
    }
};

export const updateUser = async (data: any): Promise<Data> => {
    try {
        const token = localStorage.getItem('token');

        const response = await api.put<any>('/users', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        throw error;
    }
};

export const getAvatarsUser = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token');

        const response = await api.get<any>('/users/avatars', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        throw error;
    }
};

export const getAvatarsShop = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token');

        const response = await api.get<any>('/users/avatarsShop', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        throw error;
    }
};

export const getRewards = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token');

        const response = await api.get<any>('/users/rewards', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        throw error;
    }
};

export const getBoards = async (): Promise<BoardDTO[]> => {
    try {
        const response = await api.get<BoardDTO[]>('/boards');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
};

export const getBoardDetailsById = async (id: number): Promise<BoardDTO> => {
    try {
        const response = await api.get<BoardDTO>(`/boards/${id}/details`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
};

export const createBoard = async (data: any): Promise<Data> => {
    try {
        const response = await api.post<any>('/boards', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        throw error;
    }
};

export const purchaseAvatars = async (ids: any): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post<any>(`/users/purchaseAvatar`, { avatarIds: ids }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
};

export const rendeenReward = async (rewardId: number): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post<any>(`/users/rendeenReward`, { rewardId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
};

export const getUsersRanking = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get<any>(`/users/ranking`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
};

