const mongoose=require("mongoose");
const dotenv=require('dotenv');

dotenv.config();
mongoose.set('strictQuery',true);

const connectDB=()=>{
    return mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Connected to DB");
    }).catch((e)=>{
        console.log(e);
    });
}
module.exports=connectDB;