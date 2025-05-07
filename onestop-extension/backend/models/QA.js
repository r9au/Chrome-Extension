const mong=require('mongoose')
const QAbase=new mong.Schema({
    project:{
        type:mong.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    user:{
            type:mong.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
    question:{type:String, required:true},
    answer:String,
    url:String,
    tags:[String],
    createAt:{type:Date,default:Date.now()}
})
module.exports=mong.model("QA",QAbase)