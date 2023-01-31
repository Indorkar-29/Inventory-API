const mongoose=require('mongoose');

const customerSchema=new mongoose.Schema({name:String,email:String});

const customerModel=mongoose.model("customer",customerSchema);

module.exports=customerModel;