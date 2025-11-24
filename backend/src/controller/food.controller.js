const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/savemodel');
const commentModel = require('../models/comment.model'); // <-- important

// CREATE FOOD
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
       price: req.body.price, 
      foodPartner: req.foodPartner._id
    });

    return res.json({
      message: "Food item created successfully",
      foodItem
    });

  } catch (err) {
    console.error("CREATE FOOD ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// GET ALL FOOD ITEMS
async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({}).populate("foodPartner");
  return res.json({
    message: "Food items fetched successfully",
    foodItems,
  });
}

// LIKE / UNLIKE FOOD
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

      return res.status(200).json({ liked: false, likeCount: updatedFood.likeCount });
    }

    await likeModel.create({ user: user._id, food: foodId });

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    return res.status(201).json({ liked: true, likeCount: updatedFood.likeCount });

  } catch (error) {
    console.error("LIKE ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// SAVE / UNSAVE FOOD
async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({ user: user._id, food: foodId });

    if (isAlreadySaved) {
      await saveModel.deleteOne({ user: user._id, food: foodId });

      return res.status(200).json({ saved: false });
    }

    await saveModel.create({ user: user._id, food: foodId });

    return res.status(201).json({ saved: true });

  } catch (error) {
    console.error("SAVE ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// GET SAVED FOOD LIST
async function getSavedFood(req, res) {
  try {
    const user = req.user;
    const savedFood = await saveModel.find({ user: user._id }).populate("food");

    return res.json({
      message: "Saved food items fetched successfully",
      savedFood: savedFood.map(item => item.food)
    });

  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ADD COMMENT
async function addComment(req, res) {
  try {
    const { foodId, text } = req.body;
    const user = req.user;

    const comment = await commentModel.create({
      food: foodId,
      user: user._id,
      text
    });

    return res.json({ message: "Comment added", comment });

  } catch (error) {
    console.error("COMMENT ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// GET COMMENTS FOR ONE FOOD
async function getComments(req, res) {
  try {
    const { foodId } = req.params;

    const comments = await commentModel
      .find({ food: foodId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json({ comments });
  } catch (error) {
    console.error("getComments ERROR:", error);
    return res.status(500).json({ error: "Failed to load comments" });
  }
}



module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedFood,
  addComment,
  getComments
};

