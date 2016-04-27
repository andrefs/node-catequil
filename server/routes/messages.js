import bodyParser from 'body-parser';
import config   from '../../config';
import jwt from 'jwt-simple';

import Message from '../models/Message';

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));

    app.route('/api/messages')
    .get(function(req, res){
        let start =  0;
        let limit = 10;
        Channel.list({start, limit}, function(err, count, results){
            res.json(results);
        });
    });

};
