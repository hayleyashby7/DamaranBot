import { HttpResponse, http } from 'msw';

const data = {
    data: {
        name: 'Test Data',
    },
};

export const handlers = [
    http.get('https://api.kanka.io/1.0/*', () => {
        return HttpResponse.json(data);
    }),
];
