var id = require('pow-mongodb-fixtures').createObjectId;

var users = exports.users = {
    user2: {
        "_id" : id(),
        "username" : "user2@example.com",
        "local" : {
            "password" : "$2a$10$zGVqt8lREnTFiB4SvATVzuBT/V0tEMEPjxZVx4IMYAqLebBQtgHge", // pwd
            "username" : "user2@example.com"
        },
    },
    user1: {
        "_id" : id(),
        "username" : "user1@example.com",
        "local" : {
            "password" : "$2a$10$9n3x5MVkUbaoHAT/xTO6CetcydH32O8j7m/yxj9kOCMHH08RmODHa", // pwd
            "username" : "user1@example.com"
        },
    }
};

var channels = exports.channels = {
    general: {
        "_id" : id(),
        "name" : "#general",
        "type" : "room",
        "isPrivate" : false,
        "createdAt" : new Date(),
        "createdBy" : users.user1._id,
        "participants" : [
            users.user2._id,
            users.user1._id
        ]
    },
    random: {
        "_id" : id(),
        "name" : "#random",
        "type" : "room",
        "isPrivate" : false,
        "createdAt" : new Date(),
        "createdBy" : users.user2._id,
        "participants" : [
        ]
    },
};


var messages = exports.messages = {
    msg1: {
    	"_id" : id(),
    	"text" : "Hey this is a message from me, user1!",
    	"channel" : channels.general._id,
    	"author" : users.user1._id,
    	"sentAt" : new Date(),
    },
    msg2: {
    	"_id" : id(),
    	"text" : "And this is a reply from me, user2 :)",
    	"channel" : channels.general._id,
    	"author" : users.user2._id,
    	"sentAt" : new Date()
    }
};
