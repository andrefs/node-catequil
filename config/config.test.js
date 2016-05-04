module.exports = {
    db: {
        uri: 'mongodb://localhost/catequil_test'
    },
    server: {
        port: 9753,
        host: 'localhost'
    },
    facebook: {
        clientID:     undefined, /* Fill this in with your Facebook App ID     */
        clientSecret: undefined, /* Fill this in with your Facebook App Secret */
    },
    auth: {
        jwt: {
            secret: 'Edit this string and keep it secret'
        }
    },
    users: {
        defaultPhotoURL: '/img/user.png'
    }
};
