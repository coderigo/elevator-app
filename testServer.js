var express = require('express'),
    server  = express();

server.use(express.static(__dirname + '/compiled-app'));

server.listen(8787, function(){
    console.log('Compiled elevator-app running on http://locahost:8787');
});