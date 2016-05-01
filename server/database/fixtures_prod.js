var id = require('pow-mongodb-fixtures').createObjectId;

var channels = exports.channels = {
    general: {
        "_id" : id(),
        "name" : "#general",
        "type" : "room",
        "isPrivate" : false,
        "createdAt" : new Date(),
        "createdBy" : null,
        "participants" : []
    }
};

