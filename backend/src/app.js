const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://food-ordering-web-eta.vercel.app"
];

app.set("trust proxy", 1);

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
