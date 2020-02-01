const dbutil = require('./dbutil');

function insertEveryDay (content, ctime, success) {
    const sql = "insert into every_day (content, ctime) values(?, ?);";
    const params = [content, ctime];
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

function queryEveryDay (success) {
    const sql = "select * from every_day order by id desc limit 1;";
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

module.exports = {
    insertEveryDay,
    queryEveryDay
}