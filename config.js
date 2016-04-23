import fs from 'fs';

try {
    let file = './config.local.js';
    fs.accessSync(file);
    console.info(`Loading config info from ${file}`);
    module.exports = require(file);
} catch(er){
    if(process.env.NODE_ENV === 'production'){
        let file = './config.production.js';
        console.info(`Loading config info from ${file}`);
        module.exports = require(file);
    } else {
        let file = './config.development.js';
        console.info(`Loading config info from ${file}`);
        module.exports = require(file);
    }
}

