const { login, register } = require("../components/auth/authController")
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
]

module.exports = routers