const express=require('express')
const authMiddleware=require('../middlewares/auth.middleware')
const foodController=require("../controller/food.controller")
const router=express.Router()
const multer = require('multer');


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 300 * 1024 * 1024 } // Allow up to 300MB videos
});

router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);

router.get('/',authMiddleware.authUserMiddleware,foodController.getFoodItems)

router.post('/like',authMiddleware.authUserMiddleware,foodController.likeFood)

router.post('/save',authMiddleware.authUserMiddleware,foodController.saveFood)

router.get('/save',authMiddleware.authUserMiddleware,foodController.getSavedFood)

router.post("/comment", authMiddleware.authUserMiddleware, foodController.addComment);
router.get("/comment/:foodId", authMiddleware.authUserMiddleware, foodController.getComments);







module.exports=router