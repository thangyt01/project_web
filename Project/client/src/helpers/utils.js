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

export function getAvatar(fullName){
    if(!fullName || fullName === '') return 'BK'
    const arr = fullName.split(' ')
    if(arr.length < 2) return arr[0].splice(0, 2).toUpperCase()
    return (arr[0][0] + arr[1][0] + '').toUpperCase()
}