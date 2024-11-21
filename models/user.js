const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    age: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = User;

