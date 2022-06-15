const Validator =  require('../../helpers/validator')

function updateProductValidator(req, res){
    const {
        name, 
        detail,
        description,
        price,
        color,
        imagepath,
    } = req.body

    if(name){
        let validatorName = (new Validator(name)).string().require()
        if(validatorName.check == 0 ) return 0
    }
    if(detail){
        let validatorDetail = (new Validator(detail)).string().require()
        if(validatorDetail.check == 0 ) return 0
    }
    if(description){
        let validatorDescription = (new Validator(description)).string().require()
        if(validatorDescription.check == 0 ) return 0
    }
    if(color){
        let validatorColor = (new Validator(color)).string().require()
        if(validatorColor.check == 0 ) return 0
    }
    if(imagepath){
        let validatorImagepath = (new Validator(imagepath)).string().require()
        if(validatorImagepath.check == 0 ) return 0
    }
    if(price){
        let validatorPrice = (new Validator(price)).string().require()
        if(validatorPrice.check == 0 ) return 0
    }
   
    return 1
}

function createProductValidator(req, res){
    const {
        name, 
        price,
    } = req.body

    let validatorName = (new Validator(name)).string().require()
    let validatorPrice = (new Validator(price)).string().require()
    return validatorName.check * validatorPrice.check;
}


module.exports = {
    updateProductValidator,
    createProductValidator
}