import bodyParser from 'body-parser';
import config   from '../../config';
import jwt from 'jwt-simple';
import User from '../models/User';
import mongoose from 'mongoose';

module.exports = function(app, passport){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));

    //

    app.route('/api/users')
    .get(function(req, res){
        let start =  0;
        let limit = 10;
        User.list({start, limit}, function(err, count, results){
            res.json(results);
        });
    });


    app.route('/api/user')
    .get(function(req, res){
        if(!req.user){
            res.send({});
        }
        User.findOne({_id: mongoose.Types.ObjectId(req.user.sub)}, '_id username', function(err, doc){
            if(err){ res.send(err); }
            res.send(doc);
        });
     });

    // Facebook

    app.route('/auth/facebook')
    .get(passport.authenticate('facebook', {
        session         : false,
        successRedirect : '/chat',
        failureRedirect : '/'
    }));

    app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
        session         : false,
        successRedirect : '/chat',
        failureRedirect : '/'
    }));

    // Local

    app.route('/register')
    .post(passport.authenticate('local-register', {session:false}), function(req, res){
        console.info(`User registered with local-register: ${req.user.local.username}`);
        const now = Date.now();
        const week_later = now + 7*24*60*60;
        const claims = {
            sub: req.user.id,
            iat: now,
            exp: week_later
        };
        let token = jwt.encode(claims, config.auth.jwt.secret);
        console.info(`User logged in with local-login: ${req.user.local.username}`);
        res.json({
            token: token,
            user: {
                _id: req.user['_id'],
                username: req.user.username
            }
        });
    });

    app.route('/login')
    .post(passport.authenticate('local-login', {session:false}), function(req, res, next){
        // TODO: this code is repeated in local-register
        const now = Date.now();
        const week_later = now + 7*24*60*60;
        const claims = {
            sub: req.user.id,
            iat: now,
            exp: week_later
        };
        let token = jwt.encode(claims, config.auth.jwt.secret);
        console.info(`User logged in with local-login: ${req.user.local.username}`);
        res.json({
            token: token,
            user: {
                _id: req.user['_id'],
                username: req.user.username
            }
        });
    });

};
