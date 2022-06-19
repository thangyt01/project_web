function genPrivateKey(id){
    let pk
    const d = new Date()
    pk = d.getDate() * (d.getMonth() + 1) + d.getFullYear() - d.getHours() * d.getMinutes() * d.getSeconds() * id
    pk = pk >= 0 ? pk : -pk
    return pk
}

const {find, update} = require('../../database/service/index')
async function genRandomDiscount(){
    const listProduct = await find({
        attributes: [],
        table: 'product'
    })
    console.log(listProduct.map(i=>i.id))

    listProduct.forEach(async element => {
        await update({
            table: 'product',
            where: `product.id  = ${element.id}`,
            data: {
                discount: Math.floor(Math.random() * 21)
            }
        })
    });
}

module.exports = {
    genPrivateKey,
    genRandomDiscount
}