var express = require('express');
var path = require('path');
var compression = require('compression');

var app = express();

app.use(compression());

// serve static resource like css
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log('production Express server running at localhost:', port);
});

