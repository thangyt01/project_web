export function checkUsername(username){
    if(username.length < 6 || username.length > 50) return 0
    return 1
}

export function checkPassword(password){
    if(password.length < 6) return 0
    return 1
}

export function checkRePassword(pass1, pass2){
    if(pass1 !== pass2) return 0
    return 1
}

export function checkFullname(fullname){
    if(fullname.split(' ').length < 2) return 0
    return 1
}

export function checkEmail(email){
    if(email === '') return 1
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}