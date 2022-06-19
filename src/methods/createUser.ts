import { v4 as uuidv4 } from 'uuid';
import { data } from '../data/data';
import { writeError } from '../utils/setError';

export const createUser = (request, response) => {
    try {
        let body = '';

        request.on('data', (chunk: Buffer) => {
            body += chunk.toString();
        });
        request.on('end', () => {
            try {
                const { username, age, hobbies, ...fields } = JSON.parse(body);

                if (!username || !age || !hobbies) {
                    const messageError = { message: 'Your request body does not contain required fields' };
                    writeError(response, 400, messageError);
                } 
                else if ((Object.keys(fields)).length > 0) {
                    const messageError = { message: 'Your request body contains extra fields' };
                    writeError(response, 400, messageError);
                }
                else if (request.headers['content-type'] !== 'application/json' ) {
                    const messageError = { message: 'Your request body does not an objects' };
                    writeError(response, 400, messageError);
                }
                else if (hobbies.length > 0 && !hobbies.every((item: string) => typeof item === 'string' )) {
                    const messageError = { message: 'Hobbies field contains incorrect data' };
                    writeError(response, 400, messageError);
                }
                else if (typeof username === 'string' && typeof age === 'number' && hobbies instanceof Array) {
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
                    const messageError = { message: 'Your request body contains incorrect data' };
                    writeError(response, 400, messageError);
                }
            } catch (err) {
                const messageError = { message: 'Your request body is invalid' };
                writeError(response, 400, messageError);
            }
        });
    } catch (err) {
        writeError(response, 500, { message: 'Internal Server Error' });
    }
};
