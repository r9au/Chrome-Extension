const exp=require('express')
const cors=require('cors')
const mong=require('mongoose')
require('dotenv').config();
const session=require('express-session')
const passport=require('./config/passport')
const Proroutes=require('./routes/Proroutes');
const Linkroutes=require('./routes/Linkroute')
const qaroutes=require('./routes/QAroutes');
const authroutes=require('./routes/authRoutes')
const app=exp();
app.use(cors({
    origin:['http://localhost:5173','http://localhost:3000','http://localhost:8000','http://localhost:5001'],
    credentials:true
}));
app.use(exp.json());
mong.connect(process.env.MongoUri).then(()=>console.log("Mongo connected")).catch((err)=>console.log(err))
const port=process.env.PORT || 8000;
app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/projects",Proroutes)
app.use("/api/Links",Linkroutes)
app.use("/api/QA",qaroutes)
app.use("/auth",authroutes)
app.get("/",(req,res)=>{ 
    res.send("App is running");
})
app.listen(port,(req,res)=>{
    console.log("app runs");
})
//username-r9audurti
//password-dWRS3JEs1C5htAkC