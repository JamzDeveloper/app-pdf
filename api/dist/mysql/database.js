"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mysql_1 = __importDefault(require("mysql"));
var database = require('./keys').database;
var pool = mysql_1["default"].createPool(database);
var promisify = require('util').promisify;
pool.getConnection(function (err, conn) {
    if (err) {
        console.log(err);
    }
    if (conn)
        conn.release();
    console.log("DB IS CONNECTED");
    return;
});
//convert to promiseto has callback
pool.query = promisify(pool.query);
module.exports = pool;
//# sourceMappingURL=database.js.map