const mongoose=require("mongoose");

const inventorySchema=new mongoose.Schema({inventory_type:String,item_name:String,available_quantity:Number});

const inventoryModel=mongoose.model("items",inventorySchema);

module.exports=inventoryModel;