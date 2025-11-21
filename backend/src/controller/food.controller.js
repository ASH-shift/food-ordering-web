const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
    try {
        // Upload file/video to ImageKit
        const fileUploadResult = await storageService.uploadFile(
            req.file.buffer,
            uuid()
        );

        // Save to MongoDB (link food to the food partner)
    const foodItem = await foodModel.create({
    video: fileUploadResult.url,
    name: req.body.name,
    description: req.body.description,
    foodPartner: req.foodPartner._id   // <--- CORRECT FIX
});


        return res.json({
            message: "Food item created successfully",
            foodItem: foodItem
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


async function getFoodItems(req, res) {
    const foodItems=await foodModel.find({});
    return res.json({
        message:"Food items fetched successfully",
        foodItems:foodItems
    }   
    );
}

module.exports = {
    createFood,getFoodItems
};
