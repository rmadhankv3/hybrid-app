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

function getData(response){
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      console.log('Connected to postgres! Getting schemas...');
      client
        .query('SELECT firstname,lastname FROM salesforce.contact;')
        .on('row', function(row) {
          response.write(JSON.stringify(row));
        });
    });
}

http.createServer(onRequest).listen(process.env.PORT || 3000);

function onRequest(request, response){
    console.log('the request from user',request.url);
    response.writeHead(200);
    response.write('following is the data from server contact objet');
    getData(response);
    response.end();
}

