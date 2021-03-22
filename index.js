const express = require('express')
const path = require('path')
require('./src/db/mongoose.js')
const User = require('./src/models/user.js')
const passport = require('passport')
const session = require('express-session')
const {ensureAuth, ensureGuest} = require('./middleware/auth.js')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// const {helper} = require('./views/client.js')


require('./config/passport.js')(passport)





const app = express()
app.use(express.json())


app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    
  }))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.get('/login', ensureGuest, (req, res) => {
    res.render('login')
})


app.get('/auth/google', passport.authenticate('google', {scope : ['email']}))


app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res)=> {
    // console.log(req.user.type)
    // const typeOfUser = req.user.type
    res.redirect('/')
    app.get('/', (req, res) => {
        console.log(req.user.type)
        const role = req.user.type
        User.find({}, (err, users)=> {
            if(err){
                return console.log('error')
            }
            // console.log(users)
            
            res.render('details-page', {users, role})
            
            
        })
    })
    // res.redirect('/')
})

app.post('/verify', urlencodedParser, (req, res) => {
    console.log('clicked')
    console.log(req.body.PAN)
    res.sendStatus(200)
})

app.post('/post', (req, res) => {
    console.log('test')
    res.send(200)
})


// app.get('/', ensureAuth, (req, res) => {
//     User.find({}, (err, users)=> {
//         if(err){
//             return console.log('error')
//         }
//         // console.log(users)
        
//         res.render('details-page', {users})
        
        
//     })
// })






app.listen(3000, (req, res) => {
    console.log('app is liestening on 3000')
})