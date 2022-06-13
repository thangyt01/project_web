const Validator =  require('../../helpers/validator')

function updateOrderValidator(req, res){
    const {
        id,
        user_id,
        firstname,
        lastname,
        phone,
        address,
        product_id,
        quantity,
        total_cost,

    } = req.body

    if(id){
        let validatorId = (new Validator(id)).string().require()
        if(validatorId.check == 0 ) return 0
    }
    if(user_id){
        let validatorUser_id = (new Validator(user_id)).string().require()
        if(validatorUser_id.check == 0 ) return 0
    }
    if(firstname){
        let validatorFirstname = (new Validator(firstname)).string().require()
        if(validatorFirstname.check == 0 ) return 0
    }
    if(lastname){
        let validatorLastname = (new Validator(lastname)).string().require()
        if(validatorLastname.check == 0 ) return 0
    }
    if(phone){
        let validatorPhone = (new Validator(phone)).string().require()
        if(validatorPhone.check == 0 ) return 0
    }
    if(address){
        let validatorAddress = (new Validator(address)).string().require()
        if(validatorAddress.check == 0 ) return 0
    }
    if(product_id){
        let validatorProduct_id = (new Validator(product_id)).string().require()
        if(validatorProduct_id.check == 0 ) return 0
    }
    if(quantity){
        let validatorQuantity = (new Validator(quantity)).string().require()
        if(validatorQuantity.check == 0 ) return 0
    }
    if(total_cost){
        let validatorTotal_cost = (new Validator(total_cost)).string().require()
        if(validatorTotal_cost.check == 0 ) return 0
    }

    return 1
}

function createOrderValidator(req, res){
    const {
        id,
        user_id,
        firstname,
        lastname,
        phone,
        address,
        product_id,
        quantity,
        total_cost

    } = req.body

    let validatorId = (new Validator(id)).string().require()
    let validatorUser_id = (new Validator(user_id)).string().require()
    let validatorFirstname = (new Validator(firstname)).string().require()
    let validatorLastname = (new Validator(lastname)).string().require()
    let validatorPhone = (new Validator(phone)).string().require()
    let validatorAddress = (new Validator(address)).string().require()
    let validatorProduct_id = (new Validator(product_id)).string().require()
    let validatorQuantity = (new Validator(quantity)).string().require()
    let validatorTotal_cost = (new Validator(total_cost)).string().min(0)

}

module.exports = {
    updateOrderValidator,
    createOrderValidator
}