const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
 

const User = require('../src/models/user.js')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: '176560469866-1vem89m5raq3asg51r8j8du34e6obqod.apps.googleusercontent.com',
        clientSecret: 'WPdfrSzTie3OLmiy7nDzsDLQ',
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const data = profile.emails[0].value
        try {
            let user = await User.findOne({email: data})
            if(user){
                console.log('success')
                done(null, user)
            }
            else{
                console.log('user not found')
            }
        } catch (error) {
            console.log(error)
        }
    }))
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
    });

}