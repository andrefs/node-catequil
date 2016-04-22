import bodyParser from 'body-parser';

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
    .post(passport.authenticate('local-login', {session:false}), function(req, res){
        console.info(`User logged in with local-login: ${req.user.local.username}`);
        res.json(req.user);
    });

};
