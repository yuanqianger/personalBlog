const fs = require('fs');
const globalConfig = require('./config');

const pathMap = new Map();

const files = fs.readdirSync(globalConfig.web_path);

function init (app){
    for(let i = 0; i < files.length; i++){
        let temp = require(globalConfig.web_path + '/' + files[i]);
        if(temp.path){
            for(var [k, v] of temp.path){
                if(pathMap.get(k) == null){
                    pathMap.set(k, v);
                    app.get(k, v);
                    app.post(k, v);
                }else{
                    throw new Error('url path异常, url: '+ k);
                }
            }
        }
    }
}

module.exports.init = init;