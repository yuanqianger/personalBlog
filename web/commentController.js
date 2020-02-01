const commentDao = require('../dao/commentDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');
const url = require('url');
const captcha = require('svg-captcha');

let path = new Map();

function insertComment (request, response) {
    request.on('data', (data) => {
        data = JSON.parse(data.toString());
        let blogId = data.blogId;
        let parent = data.parent;
        let userName = data.userName;
        let comment = data.comments;
        let email = data.email;
        let parentName = data.parentName;
        commentDao.insertComment(blogId, parent, parentName, userName, comment, email, timeUtil.getNow(), timeUtil.getNow(), (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '评论成功', null));
            response.end();
        });
    });
}
path.set('/insertComment', insertComment);

function queryRandomCode (request, response) {
    let img = captcha.create({fontSize: 45, width: 100, height: 30});
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '评论成功', img));
    response.end();
}
path.set('/queryRandomCode', queryRandomCode);

function queryCommentByBlogId (request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentByBlogId(params.blogId, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}
path.set('/queryCommentByBlogId', queryCommentByBlogId);

function queryViews (request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryViews(params.blogId, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}
path.set('/queryViews', queryViews);

function queryCommentByName (request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentByName(params.blogId, params.userName, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}
path.set('/queryCommentByName', queryCommentByName);

function queryTotal (request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryTotal(params.blogId, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}
path.set('/queryTotal', queryTotal);

function queryNewComment (request, response) {
    commentDao.queryNewComment(5, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end(); 
    });
}
path.set('/queryNewComment', queryNewComment);

module.exports.path = path;