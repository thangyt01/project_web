var TimeHelper = function (data) {  
    this.data = data;
};

TimeHelper.prototype.data = {};

TimeHelper.getCurrentTime = function(format){
    var newDate = new Date();
    var timer = {
        H: newDate.getHours(),
        i: newDate.getMinutes(),
        s: newDate.getSeconds(),
        d: newDate.getDate(),
        m: newDate.getMonth() + 1,
        Y: newDate.getFullYear(),
        D: newDate.getDay()
    };
    var result = format;
    for(var attr in timer){
        var value = timer[attr];
        if(parseInt(value) < 10 && value.toString().length < 2){
            value = '0' + value.toString();
        }
        result = result.replace(attr, value);
    }
    return result;
};

module.exports = TimeHelper