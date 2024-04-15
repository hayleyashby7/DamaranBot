import { HttpResponse, http } from 'msw';

const campaign_data = {
    data: {
        name: 'Test Data',
    },
};

const db_data = {
    data: {
        value: '123',
    },
};

export const handlers = [
    http.get('https://api.kanka.io/1.0/*', () => {
        return HttpResponse.json(campaign_data);
    }),

    http.get('https://sgfgpsxpmsplzwnqzgrh.supabase.co/rest/v1/stats', () => {
        return HttpResponse.json(db_data);
    }),
];
