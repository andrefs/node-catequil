import bcrypt   from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import listPlugin from 'mongoose-list';
import User     from './User';

mongoose.plugin(listPlugin, {searchFields:['participants']});

var ChannelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    topic: String,
    isPrivate: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

module.exports = mongoose.model('Channel', ChannelSchema);
