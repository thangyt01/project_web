
function Validator(obj){
    this.obj = obj
    this.check = 1
    return this
}

Validator.prototype.require = function() {
    if(!this.check) return this
    if(this.obj === {} || this.obj === [] || this.obj === '' || this.obj === null || this.obj === undefined){
        this.check = 0
    }
    return this
}

Validator.prototype.allow = function(type){
    if(!this.obj) this.check = 0
    if(this.check) return this
    this.check = this.obj === type ? 1 : 0
    return this
}

Validator.prototype.min = function(min){
    if(!this.check) return this
    if(!(this.obj || this.obj === {}) && this.obj !== 0){
        this.check = 0;
        return this
    }
    if(this.obj < min ){
        this.check = 0;
        return this
    }
    this.check = this.obj.length >= min ? 1 : 0
    return this
}

Validator.prototype.max = function(max){
    if(!this.check) return this
    if(!(this.obj || this.obj === {}) && this.obj !== 0){
        this.check = 0;
        return this
    }
    this.check = this.obj.length <= max ? 1 : 0
    return this
}

Validator.prototype.number = function(){
    if(!this.check) return this
    this.check = (typeof this.obj) === 'number' ? 1 : 0
    return this
}

Validator.prototype.string = function(){
    if(!this.check) return this
    this.check = (typeof this.obj) === 'string' ? 1 : 0
    return this
}

module.exports = Validator