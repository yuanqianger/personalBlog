const blogDao = require('../dao/blogDao');
const tagDao = require('../dao/tagDao');
const tagBlogMappingDao = require('../dao/tagBlogMappingDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');
const url = require('url');

let path = new Map();

function queryNewHot (request, response) {
    blogDao.queryNewHot(10, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end(); 
    });
}
path.set('/queryNewHot', queryNewHot);

function queryAllBlog (request, response) {
    blogDao.queryAllBlog((result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end(); 
    });
}
path.set('/queryAllBlog', queryAllBlog);

function updateBlogView (request, response) {
    request.on('data', (data) => {
        let blogId = JSON.parse(data.toString()).blogId;
        blogDao.queryBlogView(blogId, (result) => {
            let views = result[0].views + 1;
            blogDao.updateBlogView(views, blogId, (result) => {
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '浏览成功', null));
                response.end();
            });
        });
    });
}
path.set('/updateBlogView', updateBlogView);

function queryBlogById (request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.blogId), (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end(); 
    });
}
path.set('/queryBlogById', queryBlogById);

function queryBlogByCount (request, response) {
    blogDao.queryBlogByCount((result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end(); 
    });
}
path.set('/queryBlogByCount', queryBlogByCount);

function queryBlogByPage (request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), (result) => {
        for(let i = 0; i < result.length; i++){
            result[i].content = result[i].content.replace(/<img[\w\W]*">/g, '');
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, '');
            result[i].content = result[i].content.substring(0, 200);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}
path.set('/queryBlogByPage', queryBlogByPage);

function editBlog (request, response) {
    let params = url.parse(request.url, true).query;
    let tags = params.tags.replace(/ /g, '').replace(/，/g, ',');
    request.on('data', (data) => {
        blogDao.insertBlog(params.title, data.toString(), params.tags, 0, timeUtil.getNow(), timeUtil.getNow(), (result) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
            let blogId = result.insertId;
            let tagList = tags.split(',');
            for(let i = 0; i < tagList.length; i++){
                if(!tagList[i]){
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    });
}
path.set('/editBlog', editBlog);

function queryTag (tag, blogId) {
    tagDao.queryTag(tag, (result) => {
        if(result == null || result.length == 0){
            insertTag(tag, blogId);
        }else{
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), (result) => {});
        }
    });
}

function insertTag (tag, blogId) {
    tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), (result) => {
        insertTagBlogMapping(result.insertId, blogId);
    });
}

function insertTagBlogMapping (tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), (result) => {});
}

module.exports.path = path;