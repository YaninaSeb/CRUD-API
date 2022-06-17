import { data } from '../data/data';

export const getUsers = (_, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
};
