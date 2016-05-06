import chai   from 'chai';
import async  from 'async';
import db     from '../../server/db';
import request from 'supertest';
import server from '../../server/server';
import User   from '../../server/models/User';
import Channel   from '../../server/models/Channel';
import Message   from '../../server/models/Message';
import mongoose from 'mongoose';
import config from '../../config';
import jwt from 'jwt-simple';

let jwtSecret = config.auth.jwt.secret;
let expect = chai.expect;

let user_id, user_token, general_id;

before(function(done){
    const userQuery    = {username: 'user1@example.com'};
    const channelQuery = {name: '#general'};
    async.parallel([
        function(next){ User.findOne(userQuery, '_id username', next); },
        function(next){ Channel.findOne(channelQuery, '_id name',  next); },
    ],
    function(err, res){
        user_id = res[0]._id;
        const now = Date.now();
        const week_later = now + 7*24*60*60;
        const claims = {
            sub: user_id,
            iat: now,
            exp: week_later
        };
        user_token = jwt.encode(claims, jwtSecret);
        general_id = res[1]._id;

        return done();
    });
});

describe('Messages Controllers', function() {

    it('should list messages from a channel', function(done){
        request(server)
            .get(`/api/messages/${general_id}`)
            .set('Authorization', `Bearer ${user_token}`)
            .expect(200)
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res.body[0].channel).to.equal(general_id.toString());
                return done();
            });
    });

    it('should allow authenticated user to send a message', function(done){
        const message = {
            author: mongoose.Types.ObjectId(user_id),
            channel: mongoose.Types.ObjectId(general_id),
            text: 'This is a test message'
        };

        Message.count({channel: mongoose.Types.ObjectId(general_id),}, function(err, totalMessagesBefore){
            request(server)
                .post('/api/messages')
                .send(message)
                .set('Authorization', `Bearer ${user_token}`)
                .expect(201)
                .end(function(err, res){
                    expect(err).to.be.null;
                    Message.count({channel: mongoose.Types.ObjectId(general_id),}, function(err, totalMessagesAfter){
                        expect(totalMessagesAfter).to.equal(totalMessagesBefore+1);
                        return done();
                    });
                });
        });
    });

});
