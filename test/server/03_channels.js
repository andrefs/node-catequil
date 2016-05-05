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

const jwtSecret = config.auth.jwt.secret;
let user1_id, user2_id, user1_token, user2_token;

before(function(done){
    const query = {
        username: {$in: ['user1@example.com','user2@example.com']}
    };
    const opts = {
        limit: 2,
        lean:  true,
        sort:  {username: 1}
    };
    User.find(query, '_id username', opts, function(err, res){
        user1_id = res[0]._id;
        user2_id = res[1]._id;

        const now = Date.now();
        const week_later = now + 7*24*60*60;
        const claims1 = {
            sub: user1_id,
            iat: now,
            exp: week_later
        };
        const claims2 = {
            sub: user2_id,
            iat: now,
            exp: week_later
        };
        user1_token = jwt.encode(claims1, jwtSecret);
        user2_token = jwt.encode(claims2, jwtSecret);

        return done();
    });
});

describe('Channels Controllers', function() {

    it('should create a channel and save it to the database', function(done){
        const channel = {
            name: '#testchannel',
            isPrivate: true
        };
        Channel.findOne({name: channel.name}, function(err, c){
            expect(err).to.be.null;
            expect(c).to.be.null;

            request(server)
                .post('/api/channels')
                .send(channel)
                .set('Authorization', `Bearer ${user1_token}`)
                .expect(201)
                .end(function(err, res){
                    expect(err).to.be.null;
                    Channel.findOne({name: channel.name}, function(err, c){
                        expect(err).to.be.null;
                        expect(c.name).to.equal(channel.name);
                        return done();
                    });
                });
        });
    });

    it('should not allow creating a channel with same name', function(done){
        const channel = {name: '#testchannel'};

        Channel.count({}, function(err, totalChannelsBefore){
            request(server)
                .post('/api/channels')
                .send(channel)
                .set('Authorization', `Bearer ${user1_token}`)
                .expect(500)
                .end(function(err, res){
                    expect(err).to.be.null;
                    Channel.count({}, function(err, totalChannelsAfter){
                        expect(totalChannelsBefore).to.equal(totalChannelsAfter);
                        return done();
                    });
                });
        });
    });

    it('should create channel for private conversation between two users',function(done){
        const query = {
            isPrivate: true,
            participants: {
                $all: [
                    mongoose.Types.ObjectId(user1_id),
                    mongoose.Types.ObjectId(user2_id)
                ]
            }
        };
        Channel.findOne(query, function(err, doc){
            expect(err).to.be.null;
            expect(doc).to.be.null;

            request(server)
                .get(`/api/channels/private/${user2_id}`)
                .expect(201)
                .set('Authorization', `Bearer ${user1_token}`)
                .end(function(err, res){
                    expect(err).to.be.null;
                    Channel.findOne(query, function(err, doc){
                        expect(err).to.be.null;
                        expect(doc).to.not.be.null;
                        return done();
                    });
                });
        });
    });

});
