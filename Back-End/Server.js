const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const todoRoutes = require('./Routes/todoRoutes');

dotenv.config();

const app = express();
// const uploadImages = require("./Routes/uploadImages.js")

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/todos', todoRoutes); // Todo routes
// app.use("uploadimage",uploadImages )

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
