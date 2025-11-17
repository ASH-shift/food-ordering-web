const foodModel=require('../models/food.model')

async function createFood(req, res) {

    // console.log(req.foodPartner);

    res.status(201).json({
        message: "Food created successfully",
        createdBy: req.foodPartner
    });
}

module.exports = {
    createFood
}
