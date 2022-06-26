export function getToken(key){
    if(!key) return '{}'
    const storage = JSON.parse(key)
    const user = JSON.parse(storage.user)
    if(!user.currentUser) return '{}'
    return JSON.stringify(user.currentUser.token)
}

export function checkCurrentUser(key){
    if(!key) return 0
    const storage = JSON.parse(key)
    const user = JSON.parse(storage.user)
    console.log("user", user)
    if(!user.currentUser) return 0
    return 1
}