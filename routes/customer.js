const express=require('express');
const customerModel=require("../models/customerModel");
const router=express.Router();

router.post("/createCustomer",(req,res)=>{
    customerModel.find({email:req.body.email}).then((data)=>{
        if(data.length){
            res.send("User is Registered with this email");
        }else{
            customerModel.create({
                name:req.body.name,
                email:req.body.email
            }).then(()=>{
                res.status(200).send("Customer Added Successfully");
            }).catch((err)=>{
                res.status(400).send(err.message);
            });
        }
    });
});

router.get("/customerDetails",(req,res)=>{
    customerModel.find().then((data)=>{
        res.status(200).send({data:data});
    });
});
module.exports=router;