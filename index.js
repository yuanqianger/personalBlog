const express = require('express');
const globalConfig = require('./config');
const loader = require('./loader');

const app = new express();

app.use(express.static(__dirname + '/page'));

loader.init(app);

app.listen(globalConfig.port, () => {
    console.log('server is running at 12306');
});