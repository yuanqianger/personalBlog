const tagBlogMappingDao = require('../dao/tagBlogMappingDao');
const blogDao = require('../dao/blogDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');
const url = require('url');

let path = new Map();

function queryBlogByTag (request, response) {
    let params = url.parse(request.url, true).query;
    tagBlogMappingDao.queryBlogIdByTag(parseInt(params.tagId), parseInt(params.page), parseInt(params.pageSize), (result) => {
        let blogList = [];
        for(let i = 0; i < result.length; i++){
            blogDao.queryBlogById(result[i].blog_id, (resp) => {
                blogList.push(resp[0]);
                if(blogList.length == result.length){
                    for(let i = 0; i < blogList.length; i++){
                        blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/g, '');
                        blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, '');
                        blogList[i].content = blogList[i].content.substring(0, 200);
                    }
                    response.writeHead(200);
                    response.write(respUtil.writeResult('success', '查询成功', blogList));
                    response.end();
                }
            });
        }
    });
}
path.set('/queryBlogByTag', queryBlogByTag);

function queryBlogCountByTag (request, response) {
    let params = url.parse(request.url, true).query;
    tagBlogMappingDao.queryBlogCountByTag(parseInt(params.tagId), (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}
path.set('/queryBlogCountByTag', queryBlogCountByTag);

module.exports.path = path;