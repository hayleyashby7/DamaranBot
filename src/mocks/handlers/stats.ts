import { HttpResponse, http } from 'msw';
import { LOCAL_HOST } from '../../services/dbClient';
import { ECHOES_LEFT } from '../../commands/echoes/echoes';

const echoes_data = {
    data: {
        name: 'Echoes Left',
        value: 123,
    },
};

export const handlers = [
    http.get(`${LOCAL_HOST}/stats`, ({ request }) => {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');

        switch (name) {
            case `eq.${ECHOES_LEFT}`:
                return HttpResponse.json(echoes_data);
            default:
                return HttpResponse.error();
        }
    }),

    http.patch(`${LOCAL_HOST}/stats`, async ({ request }) => {
        const updatedValue = await request.json();
        const url = new URL(request.url);
        const name = url.searchParams.get('name');

        switch (name) {
            case `eq.${ECHOES_LEFT}`:
                return HttpResponse.json({ data: updatedValue });
            default:
                return HttpResponse.error();
        }
    }),
];
