import { HttpResponse, http } from 'msw';
import { config } from '../../config';
import { ECHOES_LEFT } from '../../commands/echoes/echoes';

const echoes_data = {
    data: {
        name: 'Echoes Left',
        value: 123,
    },
};

export const handlers = [
    http.get(`${config.DB_URL}/stats`, ({ request }) => {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');

        switch (name) {
            case `eq.${ECHOES_LEFT}`:
                return HttpResponse.json(echoes_data);
            default:
                return HttpResponse.error();
        }
    }),

    http.patch(`${config.DB_URL}/stats`, async ({ request }) => {
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
