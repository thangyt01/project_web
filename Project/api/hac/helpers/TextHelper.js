var TextHelper = {};

TextHelper.parramToString = function(data){
    if(typeof data === 'undefined'){
        return "undefined data";
    }
    else if(typeof data === 'object'){
        if(data instanceof ReferenceError){
            data = TextHelper.referenceErrorToObject(data);
        }
        else if(data instanceof Error){
            data = TextHelper.referenceErrorToObject(data);
        }
        else{
            for(let i in data){
                if(data[i] instanceof ReferenceError){
                    data[i] = TextHelper.referenceErrorToObject(data[i]);
                }
                if(data[i] instanceof Error){
                    data[i] = TextHelper.referenceErrorToObject(data[i]);
                }
            }
        }
        return ' object: ' + JSON.stringify(data);
    }
    else if(typeof data === 'string'){
        return data;
    }
    else{
        return ' other: ' + JSON.stringify(data);
    }
};

TextHelper.referenceErrorToObject = function(error){
    let tmpError = {};
    for(let i in error){
        if(!error.hasOwnProperty(i)) continue;
        tmpError[i] = error[i];
    }
    let attributes = ['message', 'name', 'file', 'lineNumber', 'columnNumber', 'stack'];
    attributes.forEach(function(attr){
        if(error[attr]){
            tmpError[attr] = error[attr];
        }
    });
    return tmpError;
};

module.exports = TextHelper;
