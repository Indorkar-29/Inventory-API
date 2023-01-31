const express=require('express');
const connectDB=require('./connectDB/connectDB');
const morgan=require('morgan');
const app=express();
const customerRouter=require("./routes/customer");
const inventoryRouter=require('./routes/inventory');
const orderRouter=require("./routes/order");
const dotenv=require('dotenv');

dotenv.config();

app.use(morgan('tiny'));
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("api web tech assignment");
});

app.use("/",customerRouter);
app.use("/",inventoryRouter);
app.use("/",orderRouter);

app.listen(process.env.PORT,async()=>{
    await connectDB();
    console.log("Server is Running at Port ",process.env.PORT);
});

