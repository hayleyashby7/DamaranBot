import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, CLIENT_TOKEN, CLIENT_ID, KANKA_TOKEN, DB_TOKEN, DB_URL } = process.env;

if (NODE_ENV === 'production') {
    if (!CLIENT_TOKEN || !CLIENT_ID) {
        throw new Error('Missing environment variables');
    }

    if (!KANKA_TOKEN) {
        throw new Error('Missing service variables');
    }

    if (!DB_TOKEN || !DB_URL) {
        throw new Error('Missing database variables');
    }
}

export const config = {
    CLIENT_TOKEN,
    CLIENT_ID,
    KANKA_TOKEN,
    DB_TOKEN,
    DB_URL,
};
