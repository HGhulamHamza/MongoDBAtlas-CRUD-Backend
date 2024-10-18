import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.mjs'; // Import routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests

const corsConfig = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  };
  
  app.use(cors(corsConfig)); // Set CORS for all routes
  
app.options("",cors(corsConfig));


// MongoDB connection
let isConnected = false;
const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      throw error;
    }
  }
};

// Connect to MongoDB when the server starts
connectToDatabase();

// Routes
app.use('/api', userRoutes); // Prefix routes with /api

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
  });
});

// Set the port from environment variables or default to 4000
const PORT = process.env.PORT || 5000; //change port

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app; // For Vercel deployment
