const dbutil = require('./dbutil');

function insertBlog (title, content, tags, views, ctime, utime, success) {
    const sql = "insert into blog (title, content, tags, views, ctime, utime) values(?, ?, ?, ?, ?, ?);";
    const params = [title, content, tags, views, ctime, utime];
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

function queryBlogByPage (page, pageSize, success) {
    const sql = "select * from blog order by id desc limit ?,?";
    const params = [page * pageSize, pageSize];
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

function queryBlogByCount (success) {
    const sql = "select count(1) as count from blog;";
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

function queryBlogById (blogId, success) {
    const sql = "select * from blog where id = ?;";
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

function queryBlogView (blogId, success) {
    const sql = "select views from blog where id = ?;";
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

function updateBlogView (views, blogId, success) {
    const sql = "update blog set views = ? where id = ?;";
    const params = [views, blogId];
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

function queryAllBlog (success) {
    const sql = "select * from blog;";
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

function queryNewHot (size, success) {
    const sql = "select * from blog order by views desc limit ?;";
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
    insertBlog,
    queryBlogByPage,
    queryBlogByCount,
    queryBlogById,
    queryBlogView,
    updateBlogView,
    queryAllBlog,
    queryNewHot
}