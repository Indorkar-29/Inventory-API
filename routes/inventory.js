const express=require('express');
const inventoryModel=require('../models/inventoryModel');
const router=express.Router();

router.post('/createInventory',(req,res)=>{
    // const data=inventoryModel.find({item_name:req.body.item_name});
    // console.log(data);
    //     if(data){
    //         const newQuantity=(data[0].available_quantity)+(req.body.available_quantity);
    //         inventoryModel.updateOne({inventory_id:req.body.inventory_id},{$set:{available_quantity:newQuantity}}).then(()=>{
    //             res.status(200).send("Inventory Updated Successfully");
    //         }).catch((err)=>{
    //             res.status(400).send(err.message);
    //         });
    //     }else{
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
    // }).catch((err)=>{
    //     res.status(400).send(err.message);
    // });
// }
);

router.get("/inventory",(req,res)=>{
    inventoryModel.find().then((data)=>{
        res.status(200).send({data:data});
    });
});

module.exports=router;