// server.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const Test = require('./models/Test');

// Routes
app.get('/', (req, res) => {
  res.send('WanderNest backend is running!');
});

app.get('/api', (req, res) => {
  res.send('🌍 Welcome to WanderNest API');
});

app.post('/api/test', async (req, res) => {
  try {
    const { name } = req.body;
    const newTest = new Test({ name });
    await newTest.save();
    res.status(201).json({ message: '✅ Test entry added', data: newTest });
  } catch (error) {
    res.status(500).json({ error: '❌ Failed to add test entry' });
  }
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
