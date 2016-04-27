import bcrypt   from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import listPlugin from 'mongoose-list';
import User     from './User';
import Channel  from './Channel';

mongoose.plugin(listPlugin, {searchFields:['channel']});

var MessageSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    text: String
});

module.exports = mongoose.model('Message', MessageSchema);
