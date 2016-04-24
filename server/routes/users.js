import bodyParser from 'body-parser';
import config   from '../../config';
import jwt from 'jwt-simple';

module.exports = function(app, passport){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));

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
        res.json(req.user);
    });

    app.route('/login')
    .post(passport.authenticate('local-login', {session:false}), function(req, res, next){
        const now = Date.now();
        const week_later = now + 7*24*60*60;
        const claims = {
            sub: req.user.id,
            iat: now,
            exp: week_later
        };
        let token = jwt.encode(claims, config.auth.jwt.secret);
        console.info(`User logged in with local-login: ${req.user.local.username}`);
        res.json({token: token});
    });

};
