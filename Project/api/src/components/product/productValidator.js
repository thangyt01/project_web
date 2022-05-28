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
        detail,
        description,
        price,
        color,
        imagepath, 
    } = req.body

    let validatorName = (new Validator(name)).string().require()
    let validatorDetail = (new Validator(detail)).string().require()
    let validatorDescription = (new Validator(description)).string().require()
    let validatorColor = (new Validator(color)).string().require()
    let validatorImagepath = (new Validator(imagepath)).string().require()
    let validatorPrice = (new Validator(price)).string().require().min(0)
    return validatorName.check * validatorDetail.check * validatorDescription.check * validatorColor.check * validatorImagepath.check * validatorPrice.check;
}


module.exports = {
    updateProductValidator,
    createProductValidator
}