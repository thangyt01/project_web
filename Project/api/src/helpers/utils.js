function genPrivateKey(id){
    let pk
    const d = new Date()
    pk = d.getDate() * (d.getMonth() + 1) + d.getFullYear() - d.getHours() * d.getMinutes() * d.getSeconds() * id
    pk = pk >= 0 ? pk : -pk
    return pk
}

module.exports = {
    genPrivateKey
}