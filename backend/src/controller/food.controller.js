const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
    try {
        console.log(req.foodPartner);
        console.log(req.body);
        console.log(req.file);

        // Upload file/video to ImageKit
        const fileUploadResult = await storageService.uploadFile(
            req.file.buffer,
            uuid()
        );

          console.log(JSON.stringify(fileUploadResult, null, 4));

        console.log("Uploaded File Details:", fileUploadResult);

        // Return full details to Postman
        return res.json({
            message: "Food item created successfully",
            uploadDetails: fileUploadResult
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
