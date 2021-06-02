'use strict'

const User = use('App/Models/User')
const Token = use('App/Models/Token')

class UserController {
    async index () {
        const users = await User.all()
        return users
    }

    async store ({ request }) {
        const data = request.only(['username', 'email', 'password'])
        const user = await User.create(data)
        return user
    }

    async show ({ auth}) {
        const user = auth.user
        return user
    }

    async update ({ params, request }) {
        const user = await User.findOrFail(params.id)
        const data = request.only(['username', 'email'])
        user.merge(data)
        await user.save()
        return user
    }

    async destroy ({ params }) {
        const user = await User.findOrFail(params.id)
        await user.delete()
    }
}

module.exports = UserController
