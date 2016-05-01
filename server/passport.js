import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import User from './models/User';
import Channel from './models/Channel';
import config from '../config';
import mongoose from 'mongoose';

// User register

passport.use('local-register', new LocalStrategy(
    {usernameField: 'email'},
    function(username, password, cb){
        User.findOne({'username':username},function(err,user){
            if(err){ return cb(err); }

            // Check if user already exists
            if(user){ return cb(null, false); }

                // Create new user
                else {
                    let user = new User();
                    user.username = username;
                    user.local.username = username;
                    user.local.password = User.calcPasswordHash(password);
                    user.save(function(err, user){
                        if(err){ throw err; }

                        // Add user to #general
                        Channel.update({'name':'#general'}, {
                            $addToSet: {
                                participants: mongoose.Types.ObjectId(user._id)
                            },
                        },{},function(err, numAffected){

                            if(err){ throw err; }
                            return cb(null, user);
                        });
                    });
                }
        });
    })
);

// User login
passport.use('local-login', new LocalStrategy(
    {usernameField: 'email'},
    function(username, password, cb) {
        User.findOne({'local.username': username},function(err,user){
            // Error
            if(err){ return cb(err); }

            // No user
            if(!user){ return cb(null, false); }

            // Password invalid
            if(!user.passwordIsValid(password)){
                return cb(null, false);
            }

            return cb(null, user);
        });
    })
);

passport.use(new FacebookStrategy({
        clientID     : config.facebook.clientID,
        clientSecret : config.facebook.clientSecret,
        callbackURL  : "http://" + config.server.host+':'+config.server.port + "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos']
    },
    function(accessToken, refreshToken, profile, cb) {
        //cookies.save('username', profile.displayName)
        User.findOne({'facebook.id': profile.id}, function(err, user) {
            // Error
            if(err){ return cb(err); }

            // Ok (user already existed)
            if(!err && user !== null) {
                return cb(null, user);
            }

            // Ok (new user)
            else {
                var userObj = {
                    'facebook.id': profile.id,
                    'facebook.username': profile.displayName,
                    'username': profile.displayName
                };
                if(profile.photos && profile.photos.length){
                    userObj['facebook.photo'] = profile.photos[0].value;
                    userObj['photo'] = profile.photos[0].value;
                }
                var newUser = new User(userObj);
                newUser.save(function(err, user) {
                    return cb(err, err ? null : user);
                });
            }
        })
    }
));

module.exports = passport;
