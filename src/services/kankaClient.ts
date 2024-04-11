import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { config } from '../config';

export const kankaClient = axios.create({
    baseURL: 'https://api.kanka.io/1.0',
});

export const kankaConfig: AxiosRequestConfig = {
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.KANKA_TOKEN}`,
    } as RawAxiosRequestHeaders,
};
