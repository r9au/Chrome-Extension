const mong=require('mongoose')
const Linkbase=new mong.Schema({
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
    title:{type:String, required:true},
    url:{type:String, required:true},
    notes:String,
    tags:[String],
    createAt:{type:Date,default:Date.now()}
})
module.exports=mong.model("Link",Linkbase)