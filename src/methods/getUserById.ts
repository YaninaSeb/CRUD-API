import { data } from '../data/data';
import { IUser } from '../models/interfaces';
import { isValidateId } from '../utils/checkValidateId';
import { writeError } from '../utils/setError';

export const getUserById = (request, response) => {
    try {
        const id = request.url.replace('/api/users/', '');

        if (isValidateId(id)) {
            let hasID: boolean;
            let userById: IUser;
    
            data.forEach((user: IUser) => {
                if (user.id == id ) {
                    hasID = true;
                    userById = user;
                }
            });
    
            if (hasID) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(userById));
            } else {
                const messageError = { message: 'Cannot find user with this id' };
                writeError(response, 404, messageError);
            }
        } else {
            const messageError = { message: 'This id is invalid' };
            writeError(response, 400, messageError);
        }

    } catch (err) {
        writeError(response, 500, { message: 'Internal Server Error' });
    }
};
