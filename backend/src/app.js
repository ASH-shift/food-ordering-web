const express=require('express');
const cookieParser=require('cookie-parser');
const authRoutes=require('./routes/auth.routes');
const foodRoutes=require('./routes/food.routes');
const cors=require('cors');




const app=express();

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));


// app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5174 ',
    credentials:true,
}))


app.get('/',(req,res)=>{
    res.send('hello ash')
})

app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);

module.exports=app;