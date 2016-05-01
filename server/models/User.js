import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
import pagPlugin from 'mongoose-paginate';

mongoose.plugin(pagPlugin);

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    photo: String,
    local: {
        username:{
            type   : String,
            unique : true
        },
        password: String,
    },
    facebook: {
        id       : String,
        username : String,
        token    : String,
        email    : String,
        photo    : String,
    }
});

// static method
UserSchema.statics.calcPasswordHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// instance method
UserSchema.methods.passwordIsValid = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
