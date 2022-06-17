export const writeError = ( response, code, message) => {
        response.writeHead(code, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(message));
        response.end();
};
