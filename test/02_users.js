import chai   from 'chai';
import async  from 'async';
import db     from '../server/db';
import request from 'supertest';
import server from '../server/server';
import User   from '../server/models/User';
import Channel   from '../server/models/Channel';
import Message   from '../server/models/Message';
import mongoose from 'mongoose';
import config from '../config';
import jwt from 'jwt-simple';

let jwtSecret = config.auth.jwt.secret;
let expect = chai.expect;

before(function(done){
    db.once('open', done);
});

after(function (done){
    db.db.dropDatabase(function () {
        db.close(function () {
            done();
        });
    });
});

describe('Users Controllers', function() {
    const user = {
        email:'__testuser__@test.com',
        password:'__testpwd__'
    };
    let userID;
    let general;

    it('should create an user and save it to the database', function(done){
        request(server)
            .post('/register')
            .send(user)
            .expect(201)
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res.body.token).to.not.be.null;

                User.findOne({username: user.email},'_id username', {lean:true}, function(err, u){
                    expect(err).to.be.null;
                    expect(u).to.not.be.null;
                    expect(u.username).to.equal(user.email);

                    userID = u._id;

                    return done();
                });
            });
    });

    it('should not allow creating an user with existing username', function(done){
        User.count({}, function(err, totalUsersBefore){

            request(server)
                .post('/register')
                .send(user)
                .expect(401)
                .end(function(err, res){
                    expect(err).to.be.null;
                    User.count({}, function(err, totalUsersAfter){
                        expect(totalUsersAfter).to.equal(totalUsersBefore);
                        return done();
                    });
                });
        });
    });
    it('should automatically add new user to #general', function(done){
        User.findOne({username:user.email},'_id', function(err, u){
            expect(err).to.be.null;
            Channel.findOne({name:'#general', participants: mongoose.Types.ObjectId(u._id)}, function(err, c){
                expect(err).to.be.null;
                expect(c).to.not.be.null;
                general = c;

                return done();
            });
        });
    });

    it('should not allow unexisting user to login', function(done){
        const user = {
            email:'__UNREGISTERED__@test.com',
            password:'__testpwd__'
        };

        request(server)
            .post('/login')
            .send(user)
            .expect(401)
            .end(function(err, res){
                expect(err).to.be.null;
                return done();
            });
    });

    it('should allow registered user to login, and return a token', function(done){
        request(server)
            .post('/login')
            .send(user)
            .expect(200)
            .end(function(err, res){
                expect(err).to.be.null;

                const {sub} = jwt.decode(res.body.token, jwtSecret);
                expect(sub).to.equal(userID.toString());
                return done();
            });
    });

    it('should allow authenticated user to send a message', function(done){
        const message = {
            author: mongoose.Types.ObjectId(userID),
            channel: mongoose.Types.ObjectId(general._id),
            text: 'This is a test message'
        };

        const now = Date.now();
        const week_later = now + 7*24*60*60;
        const claims = {
            sub: userID,
            iat: now,
            exp: week_later
        };
        const token = jwt.encode(claims, jwtSecret);

        Message.count({channel: mongoose.Types.ObjectId(general._id),}, function(err, totalMessagesBefore){
            request(server)
                .post('/api/messages')
                .send(message)
                .set('Authorization', `Bearer ${token}`)
                .expect(201)
                .end(function(err, res){
                    expect(err).to.be.null;
                    Message.count({channel: mongoose.Types.ObjectId(general._id),}, function(err, totalMessagesAfter){
                        expect(totalMessagesAfter).to.equal(totalMessagesBefore+1);
                        return done();
                    });
                });
        });
    });

});
