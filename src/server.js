var express = require('express');
var app = express();


app.use(express.static('public'))

// viewed at http://localhost:8080


app.listen(8080);