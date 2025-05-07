const mong=require('mongoose')
const proSchema=new mong.Schema({
    user:{
        type:mong.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{type:String,required:true},
    description:String,
    tags:[String],
    createAt:{type:Date,default:Date.now()}
});
module.exports=mong.model("project",proSchema)