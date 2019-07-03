const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',( req, res, next ) =>{
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next(); // it will continue on to look for additional matches for queries in the endpoints
})
//first the above function will work then below one will execute

app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req,res,next) => {
    //if we get post request then above app.all will execute first and then due to
    //next() this function of post will execute

    res.end('Will add the dish: ' + req.body.name + 'with details: ' + req.body.description);
});


app.put('/dishes', (req,res,next) => {
    //if we get put or update request then above app.all will execute first and then due to
    //next() this function of post will execute
    res.statusCode = 403;
    res.end('PUT operation not supported on dishes');
});


app.delete('/dishes', (req,res,next) => {
    //if we get delete request then above app.all will execute first and then due to
    //next() this function of post will execute

    res.end('Deleting all the dishes!');
});




// function for params





app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send the dishes to you !' + req.params.dishId);
});


app.post('/dishes/:dishId', (req,res,next) => {
    res.end('Not Supported Post operation');
});


app.put('/dishes/:dishId', (req,res,next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will Update the dish: '+ req.params.dishId);
});


app.delete('/dishes/:dishId', (req,res,next) => {
    res.end('Deleting dish: '+req.params.dishId);
});


app.use(express.static(__dirname + '/public'));


app.use(( req, res, next ) => {
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname, () =>{
    console.log(`Server running at ${hostname}:${port}`);
})














// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const hostname = 'localhost';
// const port = 3000;

// const server = http.createServer(( req, res ) => {
//     console.log( "Request for " + req.url + 'by method' + req.method);

//     if(req.method == 'GET'){
//         var fileUrl;
//         if (req.url == '/') fileUrl = '/index.html';
//         else fileUrl = req.url;

//         var filePath = path.resolve('./public' + fileUrl );

//         const fileExt = path.extname(filePath);

//         if(fileExt == '.html'){
//             fs.exists(filePath, (exists) => {
//                 if(!exists){
//                     res.statusCode = 404;
//                     res.setHeader('Content-Type', 'text/html');
//                     res.end("<html><body>Error 404:</body></html>");
//                     return;
//                 }

//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'text/html');
//                 fs.createReadStream(filePath).pipe(res);

//             })
//         }

//         else{
//             res.statusCode = 404;
//             res.setHeader('Content-Type', 'text/html');
//             res.end("<html><body>Not an HTML</body></html>");
//             return;
//         }


//     }

//     else{
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/html');
//         res.end("<html><body>invalid request</body></html>");
//         return;
//     }

    
// })

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}`);
// });