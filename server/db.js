import config   from '../config';
import mongoose from 'mongoose';

// Database connection

let mongo_uri = process.env.MONGO_URI;
if(!mongo_uri && config && config.db && config.db.uri){
    mongo_uri = config.db.uri;
} else {
    mongo_uri = 'mongodb://localhost/catequil_noconfig';
    debug(`MongoDB URI not set, using hardcoded default: ${mongo_uri} ...`);
}
mongoose.connect(mongo_uri);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
if(process.env.NODE_ENV === 'development'){
    mongoose.set('debug', true);
}

export default db;
