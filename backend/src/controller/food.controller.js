const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/savemodel');
const { get } = require('mongoose');

async function createFood(req, res) {
  try {
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    const foodItem = await foodModel.create({
      video: fileUploadResult.url,
      name: req.body.name,
      description: req.body.description,
      foodPartner: req.foodPartner._id
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
  const foodItems = await foodModel.find({});
  return res.json({
    message: "Food items fetched successfully",
    foodItems: foodItems
  });
}

async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({ user: user._id, food: foodId });

    if (isAlreadyLiked) {
      await likeModel.deleteOne({ user: user._id, food: foodId });

      const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: -1 } },
        { new: true }
      );

      return res.status(200).json({
        liked: false,
        likeCount: updatedFood.likeCount
      });
    }

    await likeModel.create({ user: user._id, food: foodId });

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    return res.status(201).json({
      liked: true,
      likeCount: updatedFood.likeCount
    });

  } catch (error) {
    console.error("LIKE ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({ user: user._id, food: foodId });

    if (isAlreadySaved) {
      await saveModel.deleteOne({ user: user._id, food: foodId });

      const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { saveCount: -1 } },
        { new: true }
      );

      return res.status(200).json({
        saved: false,
        saveCount: updatedFood.saveCount
      });
    }

    await saveModel.create({ user: user._id, food: foodId });

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      { $inc: { saveCount: 1 } },
      { new: true }
    );

    return res.status(201).json({
      saved: true,
      saveCount: updatedFood.saveCount
    });

  } catch (error) {
    console.error("SAVE ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getSavedFood(req, res) {
  const user = req.user;
  const savedFood = await saveModel.find({ user: user._id }).populate('food');
 if(!savedFood||savedFood.length===0){
    return res.status(404).json({message:"No saved food items found"});
 }
 res.json({
    message:"Saved food items fetched successfully",
    savedFood:savedFood.map(item=>item.food)
 })
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedFood
};
