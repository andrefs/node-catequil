var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server');
var should = chai.should();
var async = require('async');

chai.use(chaiHttp);



describe('Authentication', function() {
    var unauthPaths = [
        '/',
        '/favicon.ico',
        '/register',
        '/chat',
        '/css/main.css',
        '/js/bundle.js'
    ];

    var authPaths = [
        '/api/channels',
        '/api/channels/rooms',
        '/api/messages',
        '/api/users',
        '/api/user',
    ];

    it('should allow unauthenticated access to public enpoints', function(done){
        async.mapSeries(unauthPaths, function(path, cb){
            chai.request(server).get(path).end(cb);
        },function(err, results){
            for(var i=0; i<unauthPaths.length; i++){
                results[i].should.have.status(200);
            }
            done();
        });
    });

    it('should prevent unauthenticated access to /api/', function(done){

        async.mapSeries(authPaths, function(path, cb){
            chai.request(server).get(path).end(function(err, res){
                return cb(null, res);
            });
        },function(err, results){
            for(var i=0; i<authPaths.length; i++){
                results[i].should.have.status(401);
            }
            done();
        });
    });
});
