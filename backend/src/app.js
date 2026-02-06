const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodpartnerRoutes = require('./routes/foodpartner.route');

const app = express();

app.set("trust proxy", 1);

// ⭐ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ⭐ CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://food-ordering-web-eta.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// ⭐ Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ⭐ Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/foodpartner', foodpartnerRoutes);

// ⭐ VERY IMPORTANT
module.exports = app;
