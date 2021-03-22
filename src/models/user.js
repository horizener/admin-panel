const mongoose = require('mongoose')


const User = mongoose.model('User', {
    name: {
        type: String
    },
    email: {
        type: String
    },
    PAN: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: String
    }


})

module.exports = User