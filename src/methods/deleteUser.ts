import { data } from '../data/data';
import { IUser } from '../models/interfaces';
import { isValidateId } from '../utils/checkValidateId';
import { writeError } from '../utils/setError';

export const deleteUser = (request, response) => {
    const id = request.url.replace('/api/users/', '');

    if (isValidateId(id)) {
        let hasID: boolean;
        let userById: IUser;
        let userIndex: number;

        data.forEach((user: IUser, index: number) => {
            if (user.id == id ) {
                hasID = true;
                userById = user;
                userIndex = index;
            }
        });

        if (hasID) {
            data.splice(userIndex, 1);
            response.writeHead(204, { 'Content-Type': 'application/json' });
            response.end();
        } else {
            const messageError = { message: 'Cannot find user with this id' };
            writeError(response, 404, messageError);
        }
    } else {
        const messageError = { message: 'This id is invalid' };
        writeError(response, 400, messageError);
    }
};
