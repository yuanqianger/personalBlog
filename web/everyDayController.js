const everyDayDao = require('../dao/everyDayDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');

let path = new Map();

function editEveryDay (request, response) {
    request.on('data', (data) => {
        everyDayDao.insertEveryDay(data.toString(), timeUtil.getNow(), (res) => {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
        });
    });
}
path.set('/editEveryDay', editEveryDay);

function queryEveryDay (request, response) {
    everyDayDao.queryEveryDay((result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '请求成功', result));
        response.end();
    });
}
path.set('/queryEveryDay', queryEveryDay);

module.exports.path = path;