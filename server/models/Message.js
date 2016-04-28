import bcrypt   from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import pagPlugin from 'mongoose-paginate';
import User     from './User';
import Channel  from './Channel';

mongoose.plugin(pagPlugin);

var MessageSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Channel'
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    text: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Message', MessageSchema);
