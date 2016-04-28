import bodyParser from 'body-parser';
import config   from '../../config';
import jwt from 'jwt-simple';
import mongoose from 'mongoose';

import Message from '../models/Message';

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));

    // CRUD
    app.route('/api/messages')
    .get(function(req, res){
        const offset     = 0;
        const limit      = 10;
        const lean       = true;
        const leanWithId = true;
        const sort       = '-sentAt';
        const populate   = {path:'author', select: '_id username'};
        const select     = '_id text author channel sentAt';
        Message.paginate({},{offset, limit, sort, populate, lean, leanWithId, select}, function(err, result){
            if(err){ res.send(err); }
            res.json(result.docs);
        });
    })
    .post(function(req, res){
        let message = new Message();
        message.author =  mongoose.Types.ObjectId(req.body.author);
        message.channel = mongoose.Types.ObjectId(req.body.channel);
        message.text = req.body.text;

        message.save(function(err){
            if(err){ res.send(err); }
            res.sendStatus(201);
        });
    });


    app.route('/api/messages/:channelID')
    .get(function(req, res){
        const offset     = 0;
        const limit      = 50;
        const sort       = '-sentAt';
        const lean       = true;
        const leanWithId = true;
        const populate   = {path:'author', select: '_id username'};
        const select     = '_id text author channel sentAt';
        const query      = {
            channel: mongoose.Types.ObjectId(req.params.channelID)
        };
        Message.paginate(query, {offset, limit, sort, populate, lean, leanWithId, select}, function(err, result){
            if(err){ res.send(err); }
            res.json(result.docs);
        });
    });
};
