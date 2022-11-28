import axios from 'axios';
import store from '../store';
import { clearCurrentUser } from '../store/actions/user';
import { BASE_API_URL } from '../utils/constants';
import { history } from '../utils/history';

export const axiosClient = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
})

export const authHeader = () => {
    const currentUser = store.getState().user;

    return {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + currentUser?.token,
    };
}

export function handleResponseLoginCheck() {
    axios.interceptors.response.use(
        response => response,
        error => {
            const currentUser = store.getState().user;
            const isLoggedIn = currentUser?.token;
            const status = error?.response?.status;

           // if (isLoggedIn && [401, 403].includes(status)) {
            if (isLoggedIn && [401].includes(status)) {
                store.dispatch(clearCurrentUser());
                history.push('/login');
            }

            return Promise.reject(error);
        }
    );
};