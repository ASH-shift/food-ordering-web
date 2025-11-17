const mongoose=require('mongoose')

function connectDB(){

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Moongoose connected");
    
})
.catch((err)=>{
    console.log("mongoose connection lost",err);
    
})
}
module.exports=connectDB