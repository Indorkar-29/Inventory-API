const express=require('express');
const inventoryModel=require('../models/inventoryModel');
const router=express.Router();

router.post('/createInventory',async (req,res)=>{
    try{
        const item=await inventoryModel.find({item_name:req.body.item_name})
        if(item.length){
            const newQuantity=item[0].available_quantity + req.body.available_quantity;
            await inventoryModel.updateOne({item_name:req.body.item_name},{$set:{available_quantity:newQuantity}});
            res.status(200).send("Inventory Updated Successfully");
        }else{
            inventoryModel.create({
                        inventory_type:req.body.inventory_type,
                        item_name:req.body.item_name,
                        available_quantity:req.body.available_quantity
                    }).then(()=>{
                        res.status(200).send("New Inventory Created Successfully");
                    }).catch((err)=>{
                        res.status(400).send(err.message);
                    });
        }
    }catch(e){
        res.status(400).send(e.message);
    }
});

router.get("/inventory",(req,res)=>{
    inventoryModel.find().then((data)=>{
        res.status(200).send({data:data});
    });
});

module.exports=router;
