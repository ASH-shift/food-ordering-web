const express = require('express');
const authController = require('../controller/auth.controller');
const { authAnyMiddleware } = require('../middlewares/auth.middleware');


const router = express.Router(); // only one router
//user api
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);

//food partner api
router.post('/foodpartner/register', authController.registerFoodPartner);
router.post('/foodpartner/login', authController.loginFoodPartner);
router.get('/foodpartner/logout', authController.logoutFoodPartner);

router.get("/me", authAnyMiddleware, (req, res) => {
  res.json({
    role: req.role,
    user: req.user || req.foodPartner
  });
});





module.exports = router;
