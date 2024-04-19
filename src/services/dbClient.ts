import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { config } from '../config';

export const dbClient = axios.create({
    baseURL: process.env.NODE_ENV === 'test' ? 'http://localhost:3000' : config.DB_URL,
});

export const dbConfig: AxiosRequestConfig = {
    headers: {
        Authorization: `Bearer ${config.DB_TOKEN}`,
        apikey: `${config.DB_TOKEN}`,
        'Content-Type': 'application/json',
    } as RawAxiosRequestHeaders,
};
