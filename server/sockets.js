import mongoose from 'mongoose';
import Message from './models/Message';

module.exports = function(io){
    io.on('new message', function(msg) {
        let message     = new Message();
        message.author  = mongoose.Types.ObjectId(msg.author._id);
        message.channel = mongoose.Types.ObjectId(msg.channel);
        message.text    = msg.text;
        message.sentAt  = new Date(msg.sentAt);
        message.save(function(err){
            io.broadcast.to(msg.channel).emit('new channel message', msg);
        });
    });

    io.on('join channel', channelID => {
        io.join(channelID);
    });

    io.on('leave channel', channelID => {
        io.leave(channelID);
    });

};

