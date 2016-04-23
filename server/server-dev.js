import express  from 'express';
import mongoose from 'mongoose';
import async    from 'async';
import logger   from 'morgan';
import React    from 'react';
import * as Router from 'react-router';
import ReactDOM from 'react-dom/server';
import routes   from '../shared/routes';
import config   from '../config';


let app = new express();

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


// Settings, middleware etc

app.use(logger('dev'));                         // logger
app.set('views', './server/views');             // view engine setup
app.set('view engine', 'hbs');                  // views folder
app.use(express.static(__dirname+'/../public/')); // static files path


// routing

app.get('/status', (req, res) => {
    res.send('Server is running and accepting requests!');
});

app.use(function(req, res){
    Router.match({routes: routes, location: req.url}, (err, redirectLocation, renderProps) => {
        // Error
        if(err){
            console.error(err);
            res.status(500).send(err.message);
        }

        // Redirect
        else if (redirectLocation) {
            let redirectURL = redirectLocation.pathname + redirectLocation.search;
            console.info('Redirecting to '+redirectURL);
            res.status(302).redirect(redirectURL);
        }

        // Ok
        else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
            res.render('index.hbs',{layout:false, html: html});
        }

        // Not found
        else {
            res.status(404).send('Page Not Found')
        }
    });
});


// Server port and start

const port = process.env.PORT || (config && config.server && config.server.port) ? config.server.port : 9754;

async.series([
    function(next){ db.once('open', next); },
    function(next){
        console.info(`Connected to MongoDB database ${mongo_uri}`);
        app.listen(port,'0.0.0.0', next);
    }],
    function(err){
        if(err){
            consolle.error.bind(console, 'Error:');
            process.exit(1);
        }
        console.info(`Server running on http://localhost:${port}`);
    }
);