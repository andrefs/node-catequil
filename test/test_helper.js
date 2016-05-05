import db from '../server/db';

db.db.dropDatabase(function(){
    db.close(function(){});
});
