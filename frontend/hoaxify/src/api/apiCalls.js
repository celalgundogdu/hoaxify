import axios from "axios";

export const signUp = (body) => {
    return axios.post('/api/1.0/users', body);
}

export const changeLanguage = (language) => {
    axios.defaults.headers['accept-language'] = language;
}

export const login = (credentials) => {
    return axios.post('/api/1.0/auth', {}, { auth: credentials });
}