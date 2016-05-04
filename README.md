# node-catequil: an isomorphic (universal) chat app written in Express + MongoDB + React + Redux

Named after the Inca god _Catequil_.

Currently it is still very much a work in progress.

## Installation

    git clone https://github.com/andrefs/node-catequil.git
    cd node-catequil
    npm install

## Running

### Development

Run each command in a different terminal window:

    npm run dev:static

and

    npm run dev:server

### Production

    npm run prod:initdb && npm run prod:build && nom run prod:server

## Dependencies

Right now, `node-catequil` stands on top of many giants' shoulders,
including:

* ES2015
* [Babel](https://babeljs.io/)
* [Express](http://expressjs.com/)
* [Passport](http://passportjs.org/)
* [MongoDB](https://www.mongodb.org/)
* [Mongoose](http://mongoosejs.com/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Immutable](https://facebook.github.io/immutable-js/)
* [Socket.io](http://socket.io/)
* [Bootstrap](http://getbootstrap.com/)
* [Gulp](http://gulpjs.com/)
* ...

See `package.json` for more details.

# Roadmap

- [ ] Add multiple default user images and randomize when registering
- [ ] Allow to create new chat rooms
- [ ] Add room/conversation to sidebar when invited by someone
- [ ] Fix mobile layout
- [ ] Fix Facebook authentication
- [ ] Add more authentication mechanisms
- [ ] Implement user's profile view
- [ ] Allow user to change profile details
- [ ] Add new message visual clue for non-active channels


## Bugs and stuff

Open a GitHub issue or, preferably, send me a pull request.
