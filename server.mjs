import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.mjs'; // Import routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests

// CORS setup
app.use(cors({
  origin: [
    'http://127.0.0.1:5175', // Local frontend during development
    // 'https://your-frontend-deployment-url.vercel.app' // Uncomment when using the deployed frontend
  ],
  credentials: true
}));

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
