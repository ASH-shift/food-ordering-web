const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const foodPartnerModel = require('../models/foodpartner.model');


// ⭐ Production Cookie Config
const cookieOptions = {
    httpOnly: true,
    secure: true,       // required for HTTPS (Render + Vercel)
    sameSite: "none"    // required for cross domain
};


// ================= REGISTER USER =================
async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });
}



// ================= LOGIN USER =================
async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        message: "Login successful",
        role: "user",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });
}



// ================= LOGOUT USER =================
function logoutUser(req, res) {
    res.clearCookie("token", cookieOptions);

    res.status(200).json({
        message: "Logout successful"
    });
}



// ================= REGISTER FOOD PARTNER =================
async function registerFoodPartner(req, res) {
    const { name, email, password } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });

    if (isAccountAlreadyExists) {
        return res.status(400).json({ message: "Account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: foodPartner._id },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
        message: "Food Partner registered successfully",
        foodPartner: {
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        }
    });
}



// ================= LOGIN FOOD PARTNER =================
async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: foodPartner._id },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        message: "Login successful",
        foodPartner: {
            id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    });
}



// ================= LOGOUT FOOD PARTNER =================
function logoutFoodPartner(req, res) {
    res.clearCookie("token", cookieOptions);

    res.status(200).json({
        message: "Logout successful"
    });
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};
