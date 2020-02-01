const dbutil = require('./dbutil');

function insertTagBlogMapping (tagId, blogId, ctime, utime, success) {
    const sql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?,?,?,?);";
    const params = [tagId, blogId, ctime, utime];
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

function queryBlogIdByTag (tagId, page, pageSize, success) {
    const sql = "select blog_id from tag_blog_mapping where tag_id = ? order by id desc limit ?,?";
    const params = [tagId, page, pageSize];
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

function queryBlogCountByTag (tagId, success) {
    const sql = "select count(*) as count from tag_blog_mapping where tag_id = ?;";
    const params = [tagId];
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

module.exports = {
    insertTagBlogMapping,
    queryBlogIdByTag,
    queryBlogCountByTag
}