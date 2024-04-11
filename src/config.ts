import dotenv from 'dotenv';

dotenv.config();

const { CLIENT_TOKEN, CLIENT_ID, KANKA_TOKEN } = process.env;

if (!CLIENT_TOKEN || !CLIENT_ID) {
    throw new Error('Missing environment variables');
}

if (!KANKA_TOKEN) {
    throw new Error('Missing service variables');
}

export const config = {
    CLIENT_TOKEN,
    CLIENT_ID,
    KANKA_TOKEN,
};
