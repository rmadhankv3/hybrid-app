/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global process */

console.log('started node app');

var http = require('http');
var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT firstname,lastname FROM salesforce.contact WHERE firstname = \'Andy\';')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

http.createServer(onRequest).listen(process.env.PORT || 3000);

function onRequest(request, response){
    console.log('the request from user',request.url);
    response.writeHead(200);
    response.write('this is a test message');
    response.end();
}

