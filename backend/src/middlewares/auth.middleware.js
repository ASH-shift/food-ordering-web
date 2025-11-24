const foodPartnerModel=require('../models/foodpartner.model');
 const userModel = require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

async function authFoodPartnerMiddleware(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const foodPartner=await foodPartnerModel.findById(decoded.id);
        

        req.foodPartner=foodPartner;
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid token"});
    }
}


async function  authUserMiddleware(req,res,next){
const token=req.cookies.token;
if(!token){
    return res.status(401).json({message:"login first"});
     

}
try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await userModel.findById(decoded.id);
    req.user=user;
    next();
}catch(err){
    return res.status(401).json({message:"invalid token"});
}
}   
async function authAnyMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if food partner
    const foodPartner = await foodPartnerModel.findById(decoded.id);
    if (foodPartner) {
      req.role = "partner";
      req.foodPartner = foodPartner;
      return next();
    }

    // Check if normal user
    const user = await userModel.findById(decoded.id);
    if (user) {
      req.role = "user";
      req.user = user;
      return next();
    }

    return res.status(401).json({ message: "Invalid token" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
  authAnyMiddleware
};
