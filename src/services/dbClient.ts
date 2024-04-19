import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { config } from '../config';

export const dbClient = axios.create({
    baseURL: config.DB_URL,
});

export const dbConfig: AxiosRequestConfig = {
    headers: {
        Authorization: `Bearer ${config.DB_TOKEN}`,
        apikey: `${config.DB_TOKEN}`,
        'Content-Type': 'application/json',
    } as RawAxiosRequestHeaders,
};
