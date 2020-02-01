const dbutil = require('./dbutil');

function insertComment (blogId, parent, parentName, userName, comment, email, ctime, utime, success) {
    const sql = "insert into comments (blog_id, parent, parent_name, user_name, comments, email, ctime, utime) values(?, ?, ?, ?, ?, ?, ?, ?);";
    const params = [blogId, parent, parentName, userName, comment, email, ctime, utime];
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

function queryCommentByBlogId (blogId, success) {
    const sql = "select * from comments where blog_id = ?;";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, blogId, (err, result) => {
        if(!err){
            success(result);
        }else{
            throw new Error(err);
        }
    });
    connection.end();
}

function queryViews (blogId, success) {
    const sql = "select count(1) as count from comments where blog_id = ? and parent = -1;";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, blogId, (err, result) => {
        if(!err){
            success(result);
        }else{
            throw new Error(err);
        }
    });
    connection.end();   
}

function queryCommentByName (blogId, userName, success) {
    const sql = "select user_name from comments where blog_id = ? and user_name = ?;";
    const params = [blogId, userName];
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

function queryTotal (blogId, success) {
    const sql = "select count(1) as count from comments where blog_id = ? and parent = -1;";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, blogId, (err, result) => {
        if(!err){
            success(result);
        }else{
            throw new Error(err);
        }
    });
    connection.end();   
}

function queryNewComment (size, success) {
    const sql = "select * from comments where blog_id != -2 order by id desc limit ?;";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, size, (err, result) => {
        if(!err){
            success(result);
        }else{
            throw new Error(err);
        }
    });
    connection.end();
}

module.exports = {
    insertComment,
    queryCommentByBlogId,
    queryViews,
    queryCommentByName,
    queryTotal,
    queryNewComment
}