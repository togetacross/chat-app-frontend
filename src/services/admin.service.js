import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import { authHeader } from './base.service';

export async function getConversationsCount() {
    return await axios.get(BASE_API_URL + '/conversation/admin/count', { headers: authHeader() });
};

export async function getUsersCount() {
    return await axios.get(BASE_API_URL + '/users/admin/count', { headers: authHeader() });
};

export async function getAllUser() {
    return await axios.get(BASE_API_URL + '/users/admin/all', { headers: authHeader() });
};

export async function getUsersDetails(userId) {
    return await axios.get(BASE_API_URL + '/users/admin/detail',
        {
            params: { userId: userId },
            headers: authHeader()
        }
    );
};