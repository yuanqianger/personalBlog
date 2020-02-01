const dbutil = require('./dbutil');

function insertTag (tag, ctime, utime, success) {
    const sql = "insert into tags (tag, ctime, utime) values(?, ?, ?);";
    const params = [tag, ctime, utime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, (err, result) => {
        if(!err){
            success(result);
        }else{
            throw new Error(err);
        }
    });
    connection.end();
}

function queryTag (tag, success) {
    const sql = "select * from tags where tag = ?;";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, tag, (err, result) => {
        if(!err){
            success(result);
        }else{
            throw new Error(err);
        }
    });
    connection.end();
}

function queryAllTags (success) {
    const sql = "select * from tags;";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, (err, result) => {
        if(!err){
            success(result);
        }else{
            throw new Error(err);
        }
    });
    connection.end();
}

function queryTagIdByTag (tag, success) {
    const sql = "select id from tags where tag = ?;";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, tag, (err, result) => {
        if(!err){
            success(result);
        }else{
            throw new Error(err);
        }
    });
    connection.end();
}

module.exports = {
    insertTag,
    queryTag,
    queryAllTags,
    queryTagIdByTag
}