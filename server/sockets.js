import mongoose from 'mongoose';
import Message from './models/Message';

module.exports = function(io){
    io.on('new message', function(msg) {
console.log('XXXXXXXXXXX 2');
        let message     = new Message();
        message.author  = mongoose.Types.ObjectId(msg.author._id);
        message.channel = mongoose.Types.ObjectId(msg.channel);
        message.text    = msg.text;
        message.sentAt  = new Date(msg.sentAt);
        message.save(function(err){
console.log('XXXXXXXXXXX 3');
            io.broadcast.to(msg.channelID).emit('new channel message', msg);
        });
    });
};

