const express=require('express')
const foodpartnerController=require('../controller/foodpartner.controller')
const authUserMiddleware=require('../middlewares/auth.middleware')
const { authAnyMiddleware } = require("../middlewares/auth.middleware");
 



const router=express.Router()
router.get("/:id",
    authAnyMiddleware,     // <-- replace authUserMiddleware
    foodpartnerController.getFoodPartnerById
);

module.exports=router;