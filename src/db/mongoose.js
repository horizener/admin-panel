const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/borrower-list', {
    useUnifiedTopology: true,
    useCreateIndex: true
})
//created schema for first time entry into db
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     email: {
//         type: String
//     },
//     PAN: {
//         type: String
//     },
//     type: {
//         type: String
//     },
//     status: {
//         type: String
//     }

// data filled in db
//change data with valid email to test
// })

// const me = new User({
//     name: 'kshitij',
//     email: 'iamkshitijaggarwal@gmail.com',
//     PAN: 'ABBSB1111A',
//     type: 'super',
//     status: null
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })

