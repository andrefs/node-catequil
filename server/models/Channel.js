import bcrypt   from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import pagPlugin from 'mongoose-paginate';
import User     from './User';

mongoose.plugin(pagPlugin);

var ChannelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['room', 'conversation']
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
