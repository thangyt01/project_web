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
    if(!user.currentUser) return 0
    return 1
}

export function getAvatar(fullName){
    if(!fullName || fullName === '') return 'BK'
    const arr = fullName.split(' ')
    if(arr.length < 2) return arr[0].splice(0, 2).toUpperCase()
    return (arr[0][0] + arr[1][0] + '').toUpperCase()
}

export function getName(fullName){
    if(!fullName || fullName === ''){
        return {
            firstname: null,
            lastname: null
        }
    }
    let obj = {
        firstname: null,
        lastname: null
    }
    let arr = fullName.split(' ')
    if(arr.length < 2){
        obj.lastname = arr[0]
    }else{
        obj.lastname = arr[arr.length - 1]
        arr.pop()
        obj.firstname = arr.join(' ')
    }     
    return obj
}

export function checkValidPass(password, re_password){
    if(password === '' || re_password === ''){
        alert("Không được để trống mật khẩu")
        return 0
    }   
    if(password !== re_password) {
        alert("Mật khẩu không trùng khớp") 
        return 0
    }
   
    return 1
}

export function getPrice(price){
    if(typeof price === 'number') return price
    if(typeof price === 'string'){
        return +price.split(' - ')[0]
    }
    return 0
}

export const COLOR_STATUS = {
    'Hủy': '#d32f2f',
    'Hoàn Thành': '#3949ab',
    'Đặt Hàng': '#ffb300',
    'Xác Nhận': '#007a00'
}

export const DEFAULT_IMAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/zing-mp3-d3a0b.appspot.com/o/Untitled.png?alt=media&token=16eb8199-3c36-4056-b0a5-32849af56001'
export const DEFAULT_IMAGE_URL_V2 = 'https://firebasestorage.googleapis.com/v0/b/zing-mp3-d3a0b.appspot.com/o/MoWat.png?alt=media&token=838c134e-886c-4d17-a2f3-2aca33c9e6be'