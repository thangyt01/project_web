const Validator =  require('../../helpers/validator')

function loginValidator(req, res){
    const {username, password} = req.body
    let validatorUsername = (new Validator(username)).string().require().min(6)
    let validatorPassword = (new Validator(password)).string().require().min(6)
    return validatorUsername.check * validatorPassword.check
}

function registerValidator(req, res){
    const {
        username, 
        password,
        re_password,
        email,
        firstname,
        lastname,
    } = req.body
    let validatorUsername = (new Validator(username)).string().require().min(6)
    let validatorPassword = (new Validator(password)).string().require().min(6)
    let validatorRe_password = (new Validator(re_password)).string().require().min(6)
    let validatorEmail = (new Validator(email)).string().allow('').min(6)
    let validatorFirstname = (new Validator(firstname)).string().require()
    let validatorLastname = (new Validator(lastname)).string().require()
    return validatorUsername.check * validatorPassword.check * validatorEmail.check * validatorFirstname.check * validatorLastname.check * validatorRe_password.check
}


module.exports = {
    loginValidator,
    registerValidator
}