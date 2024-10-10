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

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

const handleApiCall = async (call: () => Promise<any>): Promise<any> => {
    try {
        const response = await call();
        return response.data;
    } catch (error) {
        console.error('Erro ao realizar a chamada de API:', error);
        throw error;
    }
};

export const login = (data: any): Promise<any> =>
    handleApiCall(() => api.post('/auth/login', data));

export const createUser = (data: any): Promise<Data> =>
    handleApiCall(() => api.post('/users', data));

export const getUserById = (): Promise<Data> =>
    handleApiCall(() => api.get(`/users`, getAuthHeaders()));

export const updateUser = (data: any): Promise<Data> =>
    handleApiCall(() => api.put('/users', data, getAuthHeaders()));

export const getAvatarsUser = (): Promise<any> =>
    handleApiCall(() => api.get('/users/avatars', getAuthHeaders()));

export const getAvatarsShop = (): Promise<any> =>
    handleApiCall(() => api.get('/users/avatarsShop', getAuthHeaders()));

export const getRewards = (): Promise<any> =>
    handleApiCall(() => api.get('/users/rewards', getAuthHeaders()));

export const getBoards = (): Promise<BoardDTO[]> =>
    handleApiCall(() => api.get('/boards'));

export const getBoardDetailsById = (id: number): Promise<BoardDTO> =>
    handleApiCall(() => api.get(`/boards/${id}/details`));

export const createBoard = (data: any): Promise<Data> =>
    handleApiCall(() => api.post('/boards', data));

export const purchaseAvatars = (ids: any): Promise<any> =>
    handleApiCall(() => api.post('/users/purchaseAvatar', { avatarIds: ids }, getAuthHeaders()));

export const rendeenReward = (rewardId: number): Promise<any> =>
    handleApiCall(() => api.post('/users/rendeenReward', { rewardId }, getAuthHeaders()));

export const getUsersRanking = (): Promise<any> =>
    handleApiCall(() => api.get('/users/ranking', getAuthHeaders()));

export const finishRetro = (retroId: any): Promise<any> =>
    handleApiCall(() => api.post('/boards/finish', { retroId }, getAuthHeaders()));
