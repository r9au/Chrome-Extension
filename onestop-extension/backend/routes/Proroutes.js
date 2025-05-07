const exp=require('express');
const route=exp.Router();
const Proschema=require('../models/Project');
const { isAuthenticated } = require('../middleware/auth');
route.post("/",isAuthenticated,async(req,res)=>{
    // console.log(req.body)
    try{
        const newProject=await Proschema.create({...req.body,user:req.user._id});
        res.json(newProject)
    }
    catch(err){
        res.status(500).json(err);
    }
});
route.get("/",isAuthenticated,async(req,res)=>{
    try{
        // console.log(req.body)
        const project=await Proschema.find({user:req.user._id}).sort({createAt:-1})
        res.json(project)
    }
    catch(err){
        res.status(500).json(err)
    }
})
route.put("/:id",isAuthenticated,async(req,res)=>{
 try {
    const project=await Proschema.findOne({
        _id:req.params._id,
        user:req.user._id,
    })
    if(!project){
        res.status(404).json({msg:"project/user not found"})
    }
    const updated=await Proschema.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    });
    res.json(updated)
 } catch (err) {
    res.status(500).json(err);
 }
})
route.get("/:id",isAuthenticated,async(req,res)=>{
    try {
        const project=await Proschema.findOne({_id:req.params.id,user:req.user._id})
        if(!project){
            res.status(404).json({msg:"project/user not found"})
        }
        res.json(project)

    } catch (err) {
        res.status(500).json(err)
    }
})
route.delete("/:id",isAuthenticated,async(req,res)=>{
    try {
        await Proschema.findByIdAndDelete(req.params.id)
        res.json({message:"Deleted succcessfully"})
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=route;