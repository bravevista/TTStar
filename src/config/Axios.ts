import axios from 'axios';

//Configuración global de Axios para incluir cookies JWT en cada petición
//axios.defaults.withCredentials = true;  //Envía cookies en cada request
//axios.defaults.baseURL = 'https://localhost:4343';  //URL base de la API
//axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';  //URL base de la API

export const apiTest = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    withCredentials: true,  //Envía cookies en cada request
    timeout: 5 * 1000,  //Máximo tiempo(ms) de espera
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_API_URL,
    withCredentials: true,  //Envía cookies en cada request
    timeout: 5 * 1000,  //Máximo tiempo(ms) de espera
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});