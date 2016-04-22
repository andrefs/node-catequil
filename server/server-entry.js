require('babel-register'); //enables ES6 when require'ing modules
require(process.env.NODE_ENV === 'production' ? './server-prod' : './server-dev'); // loads server transpiling with babel
