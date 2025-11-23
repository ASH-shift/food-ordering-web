const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');
const foodpartnerRoutes = require('./routes/foodpartner.route');

const app = express();

// Middleware (ONLY ONCE)
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser());

// CORS FIX
app.use(cors({
    origin: 'http://localhost:5173', // frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Test route
app.get('/', (req, res) => {
    res.send('hello ash');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/foodpartner', foodpartnerRoutes);

module.exports = app;
