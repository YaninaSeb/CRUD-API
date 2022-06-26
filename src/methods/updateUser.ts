import { data } from '../data/data';
import { IUser } from '../models/interfaces';
import { isValidateId } from '../utils/checkValidateId';
import { writeError } from '../utils/setError';

export const updateUser = (request, response) => {
    try {
        const id = request.url.replace('/api/users/', '');
        
        if (isValidateId(id)) {
            let hasID: boolean;
            let userIndex: number;

            data.forEach((user: IUser, index: number) => {
                if (user.id == id ) {
                    hasID = true;
                    userIndex = index;
                }
            });

            if (hasID) {
                let body = '';

                request.on('data', (chunk: Buffer) => {
                    body += chunk.toString();
                });
                request.on('end', () => {

                    const { username, age, hobbies, ...fields } = JSON.parse(body);

                    if (!username || !age || !hobbies) {
                        const messageError = { message: 'Your request body does not contain all fields' };
                        writeError(response, 400, messageError);
                    } 
                    else if ((Object.keys(fields)).length > 0) {
                        const messageError = { message: 'Your request body contains extra fields' };
                        writeError(response, 400, messageError);
                    }
                    else if (request.headers['content-type'] !== 'application/json') {
                        const messageError = { message: 'Your request body does not an objects' };
                        writeError(response, 400, messageError);
                    }
                    else if (hobbies.length > 0 && !hobbies.every((item: string) => typeof item === 'string' )) {
                        const messageError = { message: 'Hobbies field contains incorrect data' };
                        writeError(response, 400, messageError);
                    }
                    else if (typeof username === 'string' && typeof age === 'number' && hobbies instanceof Array) {
                        data[userIndex].username = username;
                        data[userIndex].age = age;
                        data[userIndex].hobbies = hobbies;

                        response.writeHead(200, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify(data[userIndex]));
                    } 
                    else {
                        const messageError = { message: 'Your request body contains incorrect data' };
                        writeError(response, 400, messageError);
                    }
                });

            } else {
                const messageError = { message: 'Cannot find user with this ID' };
                writeError(response, 404, messageError);
            }
        } else {
            const messageError = { message: 'Your request contains invalid ID' };
            writeError(response, 400, messageError);
        }

    } catch (err) {
        writeError(response, 500, { message: 'Internal Server Error' });
    }
};
