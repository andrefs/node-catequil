import bodyParser from 'body-parser';
import config   from '../../config';
import jwt from 'jwt-simple';

import User from '../models/User';
import Channel from '../models/Channel';

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));

    app.route('/api/channels')
    .get(function(req, res){
        let start =  0;
        let limit = 10;
        Channel.list({start, limit}, function(err, count, results){
            res.json(results);
        });
    });

    app.route('/api/channels')
    .post(function(req, res){
        let channel = new Channel();
        channel.name = req.body.name;
        if(req.body.isPrivate){
            channel.isPrivate = req.body.isPrivate;
        }
        channel.save(function(err){
            if(err){ res.send(err); }
            res.sendStatus(201);
        });
    });

};
