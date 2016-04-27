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
        let start =  0;
        let limit = 10;
        Message.list({start, limit}, function(err, count, results){
            res.json(results);
        });
    })
    .post(function(req, res){
        let message = new Message();
        message.author = mongoose.Types.ObjectId(req.body.user);
        message.channel = mongoose.Types.ObjectId(req.body.channel);
        message.text = req.body.text;

        message.save(function(err){
            if(err){ res.send(err); }
            res.sendStatus(201);
        });
    });


    app.route('/api/messages/:channelID')
    .get(function(req, res){
        let start =  0;
        let limit = 50;
        let find = {
            channel: mongoose.Types.ObjectId(req.params.channelID)
        };
        console.log({find});
        let sort = '-sentAt'
        Message.list({start, limit, find, sort}, function(err, count, results){
            res.json(results);
        });
    });


};
