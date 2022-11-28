import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

export async function login(user) {
    return await axios.post(BASE_API_URL + '/auth/sign-in', user);
};

export async function registration(user) {
    return await axios.post(BASE_API_URL + '/auth/sign-up', user);
};