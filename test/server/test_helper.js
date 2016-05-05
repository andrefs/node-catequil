require('babel-register')();
import db from '../../server/db';

import chai from 'chai';
chai.config.includeStack = true;

global.expect = chai.expect;
