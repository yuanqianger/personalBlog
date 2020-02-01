const fs = require('fs');

let globalConfig = {};

const conf = fs.readFileSync(__dirname + '/server.conf');

const confArr = conf.toString().split('\n');

for(let i = 0; i < confArr.length; i++){
    globalConfig[confArr[i].trim().split('=')[0]] = confArr[i].trim().split('=')[1];
}

globalConfig.web_path = __dirname + globalConfig.web_path;

module.exports = globalConfig;