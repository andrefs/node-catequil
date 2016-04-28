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
        const start =  0;
        const limit = 10;
        const populate = 'author';
        Message.list({start, limit,populate}, function(err, count, results){
            res.json(results);
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
        const start =  0;
        const limit = 50;
        const find = {
            channel: mongoose.Types.ObjectId(req.params.channelID)
        };
        const sort = '-sentAt'
        const populate = 'author';
        Message.list({start, limit, find, sort, populate}, function(err, count, results){
            res.json(results);
        });
    });


};
