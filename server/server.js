import  express from 'express';
let config = require('../config.'+(process.env.NODE_ENV || 'development'));
let app = new express();

const port = (config && config.server && config.server.port) ?
        config.server.port : process.env.port || 9754;


app.get('/status', function(req, res){
    res.send('Server is running and accepting requests!');
});

app.listen(port, function(){
    console.log('Server running on http://localhost:'+port);
});
