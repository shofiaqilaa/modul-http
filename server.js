const http = require('http');

const todos = [
    {id: 1, text: 'Todo One'},
    {id: 2, text: 'Todo Two'},
    {id: 3, text: 'Todo Three'},
];

const server = http.createServer((req, res) => {
    // listening data from client
    const {method, url} = req;
    let body = [];

    req
        req.on('data', chunk => {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
            
            let status = 404;
            const response = {
                succes: false,
                results: [],
                erorr: ''
            };

            if (method === 'GET' && url === '/todos') {

                status = 200;
                response.success = true;
                response.results = todos;
            } 
            else if (method ==='POST' && url === '/todos') {
            
            const { id, text } = JSON.parse(body);

            if (!id || !text) {
                status = 400;
                response.error = 'Please add id and text';
            }
            else {
            todos.push({id, text});
            status = 201;
            response.succes = true;
            response.results = todos;
            }
            }

            res.writeHead(status, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'Node.js'
            });

            res.end(JSON.stringify(response));
        });

    });

const PORT = 5000;

server.listen(PORT, () => console.log(`udah runningg ${PORT}`));