import { data } from '../data/data';
import { IUser } from '../models/interfaces';
import { isValidateId } from '../utils/checkValidateId';
import { writeError } from '../utils/setError';

export const updateUser = (request, response) => {
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
                const { username, age, hobbies } = JSON.parse(body);

                if ((username && typeof username !== 'string') ||
                (age && typeof age !== 'number') ||
                (hobbies && !(hobbies instanceof Array)) ||
                request.headers['content-type'] !== 'application/json') {
                    const messageError = { message: 'Request is invalid' };
                    writeError(response, 400, messageError);
                }
                else {
                    if (username) data[userIndex].username = username;
                    if (age) data[userIndex].age = age;
                    if (hobbies) data[userIndex].hobbies = hobbies;

                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify(data[userIndex]));
                }
            });

        } else {
            const messageError = { message: 'Cannot find user with this id' };
            writeError(response, 404, messageError);
        }
    } else {
        const messageError = { message: 'This id is invalid' };
        writeError(response, 400, messageError);
    }
};
