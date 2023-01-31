const express=require("express");
const orderModel=require('../models/orderModel');
const inventoryModel=require("../models/inventoryModel");
const router=express.Router();

router.post("/createOrders",(req,res)=>{
    inventoryModel.find({inventory_id:req.body.inventory_id}).then((data)=>{
        if(data.length){
            const availability=data[0].available_quantity;
            if(availability > req.body.quantity){
                orderModel.create({
                    customer_id:req.body.customer_id,
                    inventory_id:req.body.inventory_id,
                    item_name:req.body.item_name,
                    quantity:req.body.quantity
                }).then(()=>{
                    const newQuantity=availability-req.body.quantity;
                    inventoryModel.updateOne({inventory_id:req.body.inventory_id},{$set:{available_quantity:newQuantity}}).then(()=>{
                        res.status(200).send("Order Placed Successfully");
                    }).catch((err)=>{
                        res.status(400).send(err.message);
                    });
                }).catch((err)=>{
                    res.status(400).send(err.message);
                });
            }else{
                res.status(400).send("Out of Stock");
            }
        }else{
            res.status(400).send("Invalid Inventory");
        }
    }).catch((err)=>{
        res.status(400).send(err.message);
    });
});

router.get("/orders",(req,res)=>{
    orderModel.find().then((data)=>{
        res.status(200).send({data:data});
    });
});

module.exports=router;