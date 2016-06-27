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

//pg.connect(process.env.DATABASE_URL, function(err, client) {
function getData(response){
    pg.connect('postgres://mpxytmhoxdycpa:Q8qjZJB1zlqueEnH2KeOAA2X8H@ec2-54-235-208-3.compute-1.amazonaws.com:5432/d6jl4fnfe9f22m', function(err, client) {
      if (err) throw err;
      console.log('Connected to postgres! Getting schemas...');

      client
        .query('SELECT firstname,lastname, email FROM salesforce.contact;')
        .on('row', function(row) {
          //console.log(JSON.stringify(row));
          //response.write(JSON.stringify(row));
          response.write('First Name : '+row.firstname+'\n');
          response.write('Last Name : '+row.lastname+'\n');
          response.write('Email : '+row.email+'\n\n');
          //response.end();
        })
        .on('end',function(ele){
            //console.log(ele);
            response.end();
        });
    });
}


http.createServer(onRequest).listen(process.env.PORT || 3000);

function onRequest(request, response){
    console.log('the request from user',request.url);
    
    response.writeHead(200);
    response.write('this is a test message\n');
    getData(response);
    //response.end();
}

