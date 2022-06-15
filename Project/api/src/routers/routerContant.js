const { login, register } = require("../components/auth/authController")
const { getOrder, getListTotalOrder, updateOrder, deleteOrder, statsOrder, createOrder } = require("../components/order/orderController")
const { loginValidator, registerValidator } = require("../components/auth/authValidator")
const { authenticate, authorizationAdmin } = require("../middlewares/auth")

const routers = [
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
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: getListTotalOrder
            },
            {
                name: 'update order',
                method: 'PUT',
                url: '/update',
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: updateOrder
            },
            {
                name: 'delete order',
                method: 'DELETE',
                url: '/delete',
                authenticate: null,
                authoriztion: null,
                validator: null,
                handle: deleteOrder
            },
            {
                name: 'stats order',
                method: 'GET',
                url: '',
                authenticate: null,
                authoriztion: null,
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