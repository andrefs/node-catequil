import bodyParser from 'body-parser';
import config   from '../../config';
import jwt from 'jwt-simple';
import mongoose from 'mongoose';

import User from '../models/User';
import Channel from '../models/Channel';

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));

    app.route('/api/channels')
    .get(function(req, res){
        let offset = 0;
        let limit  = 10;
        Channel.paginate({},{offset, limit}, function(err, result){
            if(err){ res.send(err); }
            res.json(result.docs);
        });
    })
    .post(function(req, res){
        let channel = new Channel();
        channel.name = req.body.name;
        if(req.body.isPrivate){
            channel.isPrivate = req.body.isPrivate;
        }
        channel.save(function(err){
            if(err){ return res.send(err); }
            req.io.broadcast.emit('new channel', channel);
            res.sendStatus(201);
        });
    });

    app.route('/api/channels/rooms/')
    .get(function(req,res){
        const query = {
            participants: mongoose.Types.ObjectId(req.user.sub),
            type:'room'
        };
        let offset = 0;
        let limit  = 10;

        Channel.paginate(query,{offset, limit}, function(err, result){
            if(err){ res.send(err); }
            res.json(result.docs);
        });
    });


    app.route('/api/channels/private/:otherID')
    .get(function(req, res){
        const userID = req.user.sub;
        const otherID = req.params.otherID;
        const query = {
            participants: [
                mongoose.Types.ObjectId(userID),
                mongoose.Types.ObjectId(otherID)
            ]
        };

        Channel.findOne(query, function(err, doc){
            const userQuery = {
                _id:{
                    $in:[
                        mongoose.Types.ObjectId(userID),
                        mongoose.Types.ObjectId(otherID)
                    ]
                }
            };


            if(!doc){
                User.find(userQuery, '_id username', {lean: true}, function(err, users){
                    if(err){ return res.send(err); }

                    let channel = new Channel();
                    channel.name = users.map(u => u.username).sort().join(' and ');
                    channel.isPrivate = true;
                    channel.createdBy = mongoose.Types.ObjectId(userID);
                    channel.participants = [
                        mongoose.Types.ObjectId(userID),
                        mongoose.Types.ObjectId(otherID)
                    ];
                    channel.save(function(err){
                        if(err){ res.send(err); }
                        req.io.broadcast.emit('new channel', channel); // should send only to otherID
                        res.send(201, channel);
                    });
                });
            } else {
                res.send(200, doc);
            }
        });
    });

};
