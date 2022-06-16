const { login, register } = require("../components/auth/authController")
const { getOrder, getListTotalOrder, updateOrder, deleteOrder, statsOrder, createOrder } = require("../components/order/orderController")
const { getListProducts, getProduct, updateProduct, deleteProduct, getRecommendProduct, getCreateProduct } = require("../components/product/productController")
const { loginValidator, registerValidator } = require("../components/auth/authValidator")
const { authenticate, authorizationAdmin, authorizationMyUser } = require("../middlewares/auth")
const { createProductValidator, updateProductValidator } = require("../components/product/productValidator")
const { getListUsers, getUser, updateUser, deleteUser } = require("../components/user/userController")

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
                authenticate: authenticate,
                authoriztion: authorizationAdmin,
                validator: updateProductValidator,
                handle: updateProduct
            },
            {
                name: 'delete product',
                method: 'DELETE',
                url: '/delete',
                authenticate: authenticate,
                authoriztion: authorizationAdmin,
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
            },
            {
                name: 'create product',
                method: 'POST',
                url: '/create',
                authenticate: authenticate,
                authoriztion: authorizationAdmin,
                validator: createProductValidator,
                handle: getCreateProduct
            }
        ]
    },
    {
        name: 'user',
        mainUrl: '/user',
        listApi: [
            {
                name: 'get list user',
                method: 'GET',
                url: '/get_list_users',
                authenticate: authenticate,
                authoriztion: authorizationAdmin,
                validator: null,
                handle: getListUsers
            },
            {
                name: 'getUser',
                method: 'GET',
                url: '',
                authenticate: authenticate,
                authoriztion: authorizationMyUser,
                validator: null,
                handle: getUser
            },
            {
                name: 'updateUser',
                method: 'PUT',
                url: '/update',
                authenticate: authenticate,
                authoriztion: authorizationMyUser,
                validator: null,
                handle: updateUser
            },
            {
                name: 'deleteUser',
                method: 'DELETE',
                url: '/delete',
                authenticate: authenticate,
                authoriztion: authorizationMyUser,
                validator: null,
                handle: deleteUser
            },
        ]
    },
    {
        name: 'order',
        mainUrl: '/order',
        listApi: [
            {
                name: 'get order',
                method: 'GET',
                url: '',
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: getOrder
            },
            {
                name: 'get list total order',
                method: 'GET',
                url: '/get_list_total_order',
                authenticate: authenticate,
                authoriztion: authorizationAdmin,
                validator: null,
                handle: getListTotalOrder
            },
            {
                name: 'update order',
                method: 'PUT',
                url: '/update',
                authenticate: authenticate,
                authoriztion: authorizationAdmin,
                validator: null,
                handle: updateOrder
            },
            {
                name: 'delete order',
                method: 'DELETE',
                url: '/delete',
                authenticate: authenticate,
                authoriztion: authorizationAdmin,
                validator: null,
                handle: deleteOrder
            },
            {
                name: 'stats order',
                method: 'GET',
                url: '/stats',
                authenticate: authenticate,
                authoriztion: authorizationAdmin,
                validator: null,
                handle: statsOrder
            },
            {
                name: 'create order',
                method: 'POST',
                url: '',
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: createOrder
            }
        ]
    },
]

module.exports = routers