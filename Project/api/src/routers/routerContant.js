const { login, register } = require("../components/auth/authController")
const { getListProducts, getProduct, updateProduct, deleteProduct, getRecommendProduct } = require("../components/product/productController")
const { loginValidator, registerValidator } = require("../components/auth/authValidator")
const { authenticate, authorizationAdmin } = require("../middlewares/auth")

const routers = [
    {
        name: 'auth',
        mainUrl: '/auth',
        listApi: [
            {
                name: 'login',
                method: 'POST',
                url: '/login',
                authenticate: null,
                authoriztion: null,
                validator: loginValidator,
                handle: login
            },
            {
                name: 'register',
                method: 'POST',
                url: '/register',
                authenticate: null,
                authoriztion: null,
                validator: registerValidator,
                handle: register
            }
        ]
    },
      {
        name: 'product',
        mainUrl: '/product',
        listApi: [
            {
                name: 'get product',
                method: 'GET',
                url: '',
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: getProduct
            }, 
            {
                name: 'get list products',
                method: 'GET',
                url: '/get_list_products',
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: getListProducts
            }, 
            {
                name: 'update product',
                method: 'PUT',
                url: '/update',
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: updateProduct
            },  
            {
                name: 'delete product',
                method: 'DELETE',
                url: '/delete',
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: deleteProduct
            }, 
            {
                name: 'get recommend product',
                method: 'GET',
                url: '/recommend',
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: getRecommendProduct
            }
        ]
    },
]

module.exports = routers