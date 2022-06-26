import { data } from '../data/data';
import { IUser } from '../models/interfaces';
import { isValidateId } from '../utils/checkValidateId';
import { writeError } from '../utils/setError';

export const deleteUser = (request, response) => {
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
                data.splice(userIndex, 1);
                response.writeHead(204, { 'Content-Type': 'application/json' });
                response.end();
            } else {
                const messageError = { message: 'Cannot find user with this ID' };
                writeError(response, 404, messageError);
            }
        } else {
            const messageError = { message: 'ID in you request is invalid' };
            writeError(response, 400, messageError);
        }

    } catch (err) {
        writeError(response, 500, { message: 'Internal Server Error' });
    }
};
