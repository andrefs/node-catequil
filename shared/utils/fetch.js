import 'isomorphic-fetch';

let isoFetch = global.fetch;

global.fetch = function (url, token, opts = {}){
    if(!token){ return isoFetch(url, opts); }

    if(!opts.headers){ opts.headers = new Headers(); }
    opts.headers.append('Authorization', `Bearer ${token}`);

    return isoFetch(url, opts);
}

