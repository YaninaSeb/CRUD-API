import { v4 as uuidv4 } from 'uuid';
import { data } from '../data/data';
import { writeError } from '../utils/setError';

export const createUser = (request, response) => {
    let body = '';

    request.on('data', (chunk: Buffer) => {
        body += chunk.toString();
    });
    request.on('end', () => {
        try {
            const { username, age, hobbies } = JSON.parse(body);

            if (typeof username === 'string' && typeof age === 'number' && hobbies instanceof Array && request.headers['content-type'] === 'application/json' ) {
                const id = uuidv4();
                const newUser = {
                    'id': id,
                    'username': username,
                    'age': age,
                    'hobbies': hobbies
                };
    
                data.push(newUser);
        
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(newUser));
            } else {
                const messageError = { message: 'Request is invalid' };
                writeError(response, 400, messageError);
            }
        } catch (err) {
            const messageError = { message: 'Request is invalid' };
            writeError(response, 400, messageError);
    }
    });
};
