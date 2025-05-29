const exp=require('express');
const route=exp.Router();
const Link=require('../models/Link');
const { isAuthenticated } = require('../middleware/auth');
route.post("/",isAuthenticated,async(req,res)=>{
    try{
        const newLink=await Link.create({...req.body, user:req.user._id});
        res.status(201).json(newLink)
    }
    catch(err){
        res.status(500).json(err);
    }
});
route.get("/", isAuthenticated,async(req,res)=>{
    try{
        const {proid}=req.query;
        const query={user:req.user._id,project:proid}
        const link=await Link.find(query).sort({createAt:-1})
        res.json(link)
    }
    catch(err){
        res.status(500).json(err)
    }
})
route.put("/:id",async(req,res)=>{
 try {
    const link=await Link.findOne({
        _id:req.params.id,
        user:req.user._id,
    })
    if(!link){
        return res.status(404).json({msg:"link/user not found"})
    }
    const updated=await Link.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    });
    res.json(updated)
 } catch (err) {
    res.status(500).json(err);
 }
})
route.get("/:id",isAuthenticated,async(req,res)=>{
    try {
        const link=await Link.findOne({_id:req.params.id,user:req.user._id})
        if(!link){
            return res.status(404).json({msg:"link/user not found"})
        }
        res.json(link)
    } catch (err) {
        res.status(500).json(err)
    }
})
route.delete("/:id",async(req,res)=>{
    try {
        await Link.findByIdAndDelete(req.params.id)
        res.json({message:"Deleted succcessfully"})
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=route;