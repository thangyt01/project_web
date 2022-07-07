var config = require('config');
var fs = require('fs');
const TextHelper = require('../helpers/TextHelper');
const TimeHelper = require('../helpers/TimeHelper');

function Log(dir){
    dir = dir ? dir : config.get('log.log_path');    
    this.dir = dir;
    this.console_log = config.get('log.console_log') || false;
    fs.existsSync(dir) || (!dir || fs.mkdirSync(dir));
}

Log.prototype.pushLog = function(task = {}, callback = function() {}) {
    return new Promise(function(resolve, reject){
        callback()
        resolve()
    })
}

Log.prototype.setLogFile = function(s, type, callback){
    try {
        let self = this
        this.pushLog({}, function(){
            if(!s || !type || !callback || typeof (callback) !== 'function'){
                return false;
            }
            var date = new Date();
            var file_name = TimeHelper.getCurrentTime('Ymd');
            var log_file = fs.createWriteStream(self.dir + '/' + file_name + '.log', {flags : 'a'});
            var time = TimeHelper.getCurrentTime('H:i:s');
            var content = time + ' [][] ';
            content += '[' + type + '] ' + TextHelper.parramToString(s) + '\n';
            if(self.console_log){
                console.log(content)
            }
            log_file.write(content);
            callback(time);
            log_file.end();
        })
    } catch(e) {
        console.log(e)
    }
};

Log.prototype.info=function(s, params){
    try {
        if(typeof params !== 'undefined'){
            s = s + TextHelper.parramToString(params);
        }
        this.setLogFile(s, 'info', function(){});
    } catch(e) {
        console.log(e)
    }
};

Log.prototype.error=function(s, params){
    try {
        if(typeof params !== 'undefined'){
            s = s + TextHelper.parramToString(params);
        }
        this.setLogFile(s, 'error', function(){});
    } catch(e) {
        console.log(e)
    }
};

module.exports = Log;