/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
console.log('started node app');

var http = require('http');

http.createServer(onRequest).listen(8888);

function onRequest(request, response){
    console.log('the request from user',request.url);
    response.writeHead(200);
    response.write('this is a test message');
    response.end();
}

