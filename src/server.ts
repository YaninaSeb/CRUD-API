import * as http from 'http';
import * as dotenv from 'dotenv';
import { getUsers } from './methods/getUsers';
import { getUserById } from './methods/getUserById';
import { writeError } from './utils/setError';
import { createUser } from './methods/createUser';
import { deleteUser } from './methods/deleteUser';
import { updateUser } from './methods/updateUser';

dotenv.config();

const port = process.env.PORT;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
        if (req.method == 'GET' && req.url == '/api/users') {
            getUsers(req, res);
        } 
        else if (req.method == 'GET' && (req.url).match(/^\/api\/users\/[\w-]+$/)) {
            getUserById(req, res);
        } 
        else if (req.method == 'POST' && req.url == '/api/users') {
            createUser(req, res);
        } 
        else if (req.method == 'PUT' && (req.url).match(/^\/api\/users\/[\w-]+$/)) {
            updateUser(req, res);
        } 
        else if (req.method == 'DELETE' && (req.url).match(/^\/api\/users\/[\w-]+$/)) {
            deleteUser(req, res);
        }
        else {
            writeError(res, 404, { message: 'Your request is invalid' });
        }
    } catch (err) {
        writeError(res, 500, { message: 'Internal Server Error' });
    }
    
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
