import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import userRoutes from "./routes/userRoutes.js";
import likesRoutes from "./routes/likesRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import authenticateUser from "./middlewares/user-auth-middleware.js";
const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;


// Cors Policy
app.use(cors({
  origin: '*', // Allow requests from all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow cookies and credentials
  optionsSuccessStatus: 200 // Respond with 200 for preflight requests
}));
const corsOrigin ={
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));

// DataBase Connection
connectDB(DATABASE_URL);

// Json
app.use(express.json());

// Apply the authenticateUser middleware globally
app.use("/api/user",userRoutes);
app.use('/api', authenticateUser);
// Load Routes
app.use("/api/like-details",likesRoutes);
app.use("/api/news",newsRoutes);
app.listen(port, () => {
  console.log(`Server is Listening at http://localhost:${port}`);
});
