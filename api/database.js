let database = {};

database.call = async function (query,params) {
    const pg = require('pg');

    let conString = "postgres://nzivzfbg:2oocpudzBzBBsyiHlmBNhFND8Ye92fJ3@isilo.db.elephantsql.com:5432/nzivzfbg" //Can be found in the Details page
    let client = new pg.Client(conString);
    try {
        await client.connect();
    } catch(ex) {
        throw('could not connect to postgres: ', ex);
    }
    let result;
    try {
        result = await client.query(query,params);
    } catch(ex) {
        throw('error running query: ', ex);
    }
    client.end();
    return result;
}

module.exports = database;
