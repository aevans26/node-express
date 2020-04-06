let database = {};

var credentials;

console.log("process.env.NOW_PGCREDENTIALS " + process.env.NOW_PGCREDENTIALS);
if (process.env.NOW_PGCREDENTIALS) {
    var branch = process.env.NOW_GITHUB_COMMIT_REF;
    var now_pgcredentials = JSON.parse(process.env.NOW_PGCREDENTIALS);
    if (branch in now_pgcredentials) {
        credentials = now_pgcredentials[branch];
    } else {
        credentials = now_pgcredentials.dev;
    }
    console.log("credentials = " + credentials)
}

database.call = async function (query,params) {
    const pg = require('pg');

    if (!credentials) throw new Error("NOW_PGCREDENTIALS env var must be set to connect to DB");

    //like "postgres://user:pass@isilo.db.elephantsql.com:5432/user"
    let conString = credentials;
    let client = new pg.Client(conString);
    try {
        await client.connect();
    } catch(ex) {
        throw('could not connect to postgres: ' + ex);
    }
    let result;
    try {
        result = await client.query(query,params);
    } catch(ex) {
        throw('error running query: ' + ex);
    }
    client.end();
    return result;
};

module.exports = database;
