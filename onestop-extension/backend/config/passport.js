const passport=require('passport')
const gitstrat=require('passport-github2').Strategy
const User=require('../models/User')
passport.use(
    new gitstrat(
        { 
            clientID:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET,
            callbackURL:process.env.GITHUB_CALL_URL
        },
        async function(acstoken,refstoke,profile,done){
            try {
                let user=await User.findOne({githubId:profile.id})
                if(!user){
                    user=await User.create({
                        githubId:profile.id,
                        username:profile.username,
                        displayName:profile.displayName,
                        profileUrl:profile.profileUrl,
                        emails:profile.emails?profile.emails.map((email)=>email.value):[],
                    })
                }
                return done(null,user)
            } catch (err) {
                console.log(err)
                return done(err,null)
            }
            // User.findOrCreate({githubId:profile.id},function(err,user){
            //     return done(err,user)
            // })
        }
    )
)
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
    try {
        const user=await User.findById(id)
        if(!user){
           return done(new Error("user not found"),null)
        }
        done(null,user)
    } catch (error) {
        console.error(error)
        done(error,null)
    }
})
module.exports=passport;