import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

class AuthenticationService {

    login(user) {
        return axios.post(BASE_API_URL + '/auth/sign-in', user);
    };

    registration(user) {
        return axios.post(BASE_API_URL + '/auth/sign-up', user);
    };
}

export default new AuthenticationService();