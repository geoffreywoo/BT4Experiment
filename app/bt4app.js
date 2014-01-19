var express = require('express');
var app = express();

var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'bt4dns.cloudapp.net',
  user     : 'azureuser',
  password : 'Serrice!',
  database : 'DNS',
});

app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.query());

// only called when its 200
var sendResponse = function (response, error, data) {
  var responseObj;
  if (error) {
    responseObj = {"ok": false, "error": error}
  } else {
    if (data !== undefined && data !== null) {
      var elementsArray;
      if (data instanceof Array) {
        elementsArray = data;
      } else if (typeof data === 'number') {
        elementsArray = [data];
      } else {
        elementsArray = new Array(data);
      }
      responseObj = {"ok": true, "elements": elementsArray}
    } else {
      responseObj = {"ok": true};
    }
  }
  response.setHeader("Content-Type", "application/json");
  response.send(responseObj);
}

var cleanUUID = function(rawUUID) {
  if (rawUUID) { 
    return rawUUID.replace(/-/g, '');
  }
  return rawUUID;
}

app.get('/', function(request, response) {
  sendResponse(response, null, 'Hello World!');
});

app.get('/bt4uri', function(request, response) {
  var bt_uuid = cleanUUID(request.query.bt_uuid);
  var company_id = request.query.company_id;
  if (bt_uuid && bt_uuid.length == 32 && company_id) {
    pool.getConnection(function(err, connection){
      connection.query('SELECT uri FROM BTtoURI WHERE bt_uuid = UNHEX(?) AND company_id = ?', [bt_uuid, company_id], function(err, rows, fields) {
        if (err) {
          console.log('err', err, connection.query.sql);
          sendResponse(response, err, null);
        } else if (rows && rows.length == 1) {
          sendResponse(response, null, rows);
        } else {
          sendResponse(response, 'Invalid UUID', null);
        }
        connection.release();
      });
    });
  } else {
    console.log(bt_uuid, company_id);
    sendResponse(response, 'Incomplete Params', null);
  }
});

app.post('/setURI', function(request, response) {
  var bt_uuid = cleanUUID(request.body.bt_uuid);
  var uri = request.body.uri;
  var company_id = request.body.company_id;
  if (bt_uuid && bt_uuid.length == 32 && company_id && uri) {
    pool.getConnection(function(err, connection){
      connection.query('INSERT INTO BTtoURI SET bt_uuid = UNHEX(?), company_id = ?, uri = ? ON DUPLICATE KEY UPDATE uri = ?', [bt_uuid, company_id, uri, uri], function(err, result) {
        if (err) {
          console.log('error', err, connection.query.sql);
          sendResponse(response, err, null);
        } else {
          sendResponse(response, null, null);
        }
        connection.release();
      });
    });
  } else {
    console.log(bt_uuid, uri, company_id);
    sendResponse(response, 'Incomplete Params', null);
  }
});

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log("Listening on " + port);
});
