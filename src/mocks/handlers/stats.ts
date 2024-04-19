import { HttpResponse, http } from 'msw';
import { LOCAL_HOST } from '../../services/dbClient';
import { ECHOES_LEFT } from '../../commands/echoes/echoes';

const echoes_data = [
    {
        name: 'Echoes Left',
        value: 123,
    },
];

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
        const url = new URL(request.url);
        const name = url.searchParams.get('name');

        switch (name) {
            case `eq.${ECHOES_LEFT}`:
                echoes_data[0].value -= 1;
                return new HttpResponse(null, { status: 204 });
            default:
                return HttpResponse.error();
        }
    }),
];
