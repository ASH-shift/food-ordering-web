const FoodPartner = require('../models/foodpartner.model');
const Food = require('../models/food.model');   // <-- Import Food model

async function getFoodPartnerById(req, res) {
    try {
        const id = req.params.id;

        // Fetch the food partner (exclude password)
        const partner = await FoodPartner.findById(id).select("-password");

        if (!partner) {
            return res.status(404).json({ message: "Foodpartner not found" });
        }

        // Fetch all foods linked to this partner
        const foodItems = await Food.find({ foodPartner: id });

        return res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: partner,
            foodItems: foodItems   // <-- IMPORTANT
        });

    } catch (err) {
        console.error("ERROR in getFoodPartnerById:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = { getFoodPartnerById };
