const tagDao = require('../dao/tagDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');
const url = require('url');

let path = new Map();

function queryRandomTags (request, response) {
    tagDao.queryAllTags((result) => {
        result.sort(() => {
            return Math.random() - 0.5;
        });
        result = result.slice(0, 15);
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}
path.set('/queryRandomTags', queryRandomTags);

function queryTagIdByTag (request, response) {
    let params = url.parse(request.url, true).query;
    tagDao.queryTagIdByTag(params.tag, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}
path.set('/queryTagIdByTag', queryTagIdByTag);

module.exports.path = path;