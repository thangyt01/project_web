const { login, register } = require("../components/auth/authController")
const { loginValidator } = require("../components/auth/authValidator")
const authenticate = require("../middlewares/auth")

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
                validator: loginValidator,
                handle: login
            },
            {
                name: 'register',
                method: 'POST',
                url: '/register',
                authenticate: null,
                validator: null,
                handle: register
            }
        ]
    },
]

module.exports = routers