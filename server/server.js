import express  from 'express';
import mongoose from 'mongoose';
import async    from 'async';
let config = require('../config.'+(process.env.NODE_ENV || 'development'));

// Database connection

let mongo_uri = process.env.MONGO_URI;
if(!mongo_uri && config && config.db && config.db.uri){
    mongo_uri = config.db.uri;
} else {
    mongo_uri = 'mongodb://localhost/trycatch_chat_noconfig';
    console.warn(`MongoDB URI not set, using hardcoded default: ${mongo_uri} ...`);
}
mongoose.connect(mongo_uri);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// ...
let app = new express();

app.get('/status', function(req, res){
    res.send('Server is running and accepting requests!');
});


// Server port and start

const port = process.env.PORT || (config && config.server && config.server.port) ? config.server.port : 9754;

async.series([
    function(next){ db.once('open', next); },
    function(next){ 
        console.info(`Connected to MongoDB database ${mongo_uri}`);
        app.listen(port, next);
    }],
    function(err){
        if(err){
            consolle.error.bind(console, 'Error:');
            process.exit(1);
        }
        console.info(`Server running on http://localhost:${port}`);
    }
);
