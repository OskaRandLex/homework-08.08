const express = require('express');
const server = express();
const fs = require('fs');


server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./public'));


server.get('/', (req, res) => {
    // res.send('Hello World')
    res.render('test');
});

server.get('/123', (req, res) => {
    res.send('Hello World123')
});

server.get('/index', (req, res) => {
    res.setHeader('content-type', 'text/html');
        fs.readFile('./public/html/index.html', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('file not found');
            } else {
                res.write(data);
            }
            res.end();
        });
});

server.get('/json', (req, res) => {
    res.setHeader('content-type', 'application/json');
    res.end(`{ "Name": "Foo", "Id": 1234, "Rank": 7 }`);
});

server.get('/img', (req, res) => {
    res.setHeader('content-type', 'image/jpg');
        fs.readFile('./public/img/random-img.jpg', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('file not found');
            } else {
                res.write(data);
            }
            res.end();
        });
});

server.get('/article/:id', (req, res) => {
    const { id } = req.params;

    res.send(`This is article id: ${id}`);
});

server.listen(3000);