import * as http from 'http';
import * as dotenv from 'dotenv';
import { getUsers } from './methods/getUsers';
import { getUserById } from './methods/getUserById';
import { writeError } from './utils/setError';
import { createUser } from './methods/createUser';

dotenv.config();

const port = process.env.PORT;

const server = http.createServer((req, res) => {
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
        else {
            writeError(res, 404, { message: 'Request not found' });
        }
    } catch (err) {
        const messageError = { message: 'Internal server error' };
        writeError(res, 500, messageError);
    }

});
  
server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
