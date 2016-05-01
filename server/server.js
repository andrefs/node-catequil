import express  from 'express';
import mongoose from 'mongoose';
import async    from 'async';
import logger   from 'morgan';
import React    from 'react';
import * as Router from 'react-router';
import ReactDOM from 'react-dom/server';
import routes   from '../shared/routes';
import config   from '../config';
import passport from './passport';
import {Provider} from 'react-redux';
import configStore from '../shared/store/configStore';
import {syncHistoryWithStore}  from 'react-router-redux'
import jwt from 'express-jwt';
import socketioJwt from 'socketio-jwt';
import favicon from 'express-favicon';

let app = new express();

// Sockets
let http = require('http').Server(app);
let io     = require('socket.io')(http,{path:'/sockets/chat/'});

// set authorization for socket.io
io.sockets
    .on('connection', socketioJwt.authorize({
        secret: config.auth.jwt.secret,
        timeout: 15*1000 // 15 seconds to send the authentication message
    }))
    .on('authenticated', function(io) {
        //this socket is authenticated, we are good to handle more events from it.
        require('./sockets')(io);

        app.use(function(req, res, next) {
            // inject referece to sockets server
            req.io = io;
            next();
        });
    });



// Database connection

let mongo_uri = process.env.MONGO_URI;
if(!mongo_uri && config && config.db && config.db.uri){
    mongo_uri = config.db.uri;
} else {
    mongo_uri = 'mongodb://localhost/catequil_noconfig';
    console.warn(`MongoDB URI not set, using hardcoded default: ${mongo_uri} ...`);
}
mongoose.connect(mongo_uri);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
if(process.env.NODE_ENV !== 'production'){
    mongoose.set('debug', true);
}


// Settings, middleware etc

app.use(logger('dev'));                           // logger
app.set('views', './server/views');               // view engine setup
app.set('view engine', 'hbs');                    // views folder
app.use(favicon(__dirname+'/../public/favicon.ico'));
app.use(express.static(__dirname+'/../public/')); // static files path
var unauthPaths = [
    '/',
    '/favicon.*',
    '/fonts',
    '/login',
    '/register',
    '/chat',
    '/favicon.ico',
    '/sockets/chat',
    '/auth/facebook',
    '/auth/facebook/callback'
];
app.use(jwt({secret: config.auth.jwt.secret}).unless({path: unauthPaths}));

// routing

require('./routes/users')(app, passport);
require('./routes/channels')(app, io);
require('./routes/messages')(app);

app.get('/status', (req, res) => {
    res.send('Server is running and accepting requests!');
});

app.use(function(req, res){

    // Store and history
    const memoryHistory = Router.createMemoryHistory(req.url)
    const store = configStore(memoryHistory)
    const history = syncHistoryWithStore( memoryHistory, store, {
        selectLocationState: state => state.get('routing').toJS()
    });

    Router.match({history, routes: routes(store), location: req.url}, (err, redirectLocation, renderProps) => {

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
            var html = ReactDOM.renderToString(
                <Provider className="root" store={store}>
                    <Router.RouterContext {...renderProps} />
                </Provider>
            );

            const initialState = store.getState();

            res.render('index.hbs',{
                layout       : false,
                html         : html,
                initialState : JSON.stringify(initialState)
            });
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
        http.listen(port,'0.0.0.0', next);
    }],
    function(err){
        if(err){
            consolle.error.bind(console, 'Error:');
            process.exit(1);
        }
        console.info(`Server running on http://localhost:${port}`);
    }
);