import { data } from '../data/data';
import { writeError } from '../utils/setError';

export const getUsers = (_, response) => {
    try {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(data));
    } catch (err) {
        writeError(response, 500, { message: 'Internal Server Error' });
    }
};
