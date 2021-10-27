import mysql from 'mysql';
const {database} = require('./keys');
const pool = mysql.createPool(database);
const {promisify} = require('util');

pool.getConnection( function(err,conn){
    if(err){
        console.log(err);
    }
    if(conn) conn.release();
    console.log("DB IS CONNECTED");
    return;
});
//convert to promiseto has callback
pool.query = promisify(pool.query);
module.exports = pool;