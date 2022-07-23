/**
 * 数据库连接
 * */ 
const mongoose = require('mongoose')
const config = require('./index')
const log4js = require('../utils/log4j.js')
mongoose.connect(config.URL,{
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', ()=>{
    log4js.error('***数据库连接失败***')
});
db.once('open', () => {
    log4js.info('***数据库连接成功***')
});