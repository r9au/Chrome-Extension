const exp=require('express');
const route=exp.Router();
const QA=require('../models/QA');
route.post("/",async(req,res)=>{
    // console.log(req.body)
    try{
        const newQA=await QA.create({...req.body,user:req.user._id});
        res.json(newQA)
    }
    catch(err){
        res.status(500).json(err);
    }
});
route.get("/",async(req,res)=>{
    try{
        // console.log(req.body)
        const {proid}=req.query
        const query=proid?{project:proid}:{}
        const qa=await QA.find(query).sort({createAt:-1})
        res.json(qa)
    }
    catch(err){
        res.status(500).json(err)
    }
})
route.put("/:id",async(req,res)=>{
 try {
    // const qa=await QA.findOne(
    //     {
    //         _id:req.params._id,
    //         user:req.user._id,
    //     }
    // )
    // if(!qa){
    //     return res.status(404).json({msg:"project/user not found"})
    // }
    const updated=await QA.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    });
    res.json(updated)
 } catch (err) {
    res.status(500).json(err);
 }
})
route.get("/:id",async(req,res)=>{
    try {
        const qa=await QA.findById(req.params.id)
        if(!qa){
            return res.status(404).json({msg:"project/user not found"})
        }
        res.json(qa)
    } catch (err) {
        res.status(500).json(err)
    }
})
route.delete("/:id",async(req,res)=>{
    try {
        await QA.findByIdAndDelete(req.params.id)
        res.json({message:"Deleted QA succcessfully"})
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=route;