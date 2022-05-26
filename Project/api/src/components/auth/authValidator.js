const Validator =  require('../../helpers/validator')

function loginValidator(req, res){
    const {username, password} = req.body
    let validatorUsername = (new Validator(username)).string().require().min(6)
    let validatorpassword = (new Validator(password)).string().require().min(6)
    return validatorUsername.check * validatorpassword.check
}


module.exports = {
    loginValidator
}