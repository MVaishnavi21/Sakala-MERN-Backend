require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected. Day 6 win.'))
  .catch(err => console.error('DB Error:', err));

app.get('/profile', (req, res) => {
  res.json({ name: 'Vaishnavi', mission: 'Sakala Mission', day: 5, skills: ['Node.js', 'Git', 'JavaScript', 'Express', 'POST'], isShipping: true });
});

app.post('/profile', (req, res) => {
  const updated = { name: 'Vaishnavi', mission: 'Sakala Mission', day: 5, skills: ['Node.js', 'Git', 'JavaScript', 'Express', 'POST'], isShipping: true, ...req.body };
  res.json({ message: 'Profile updated', data: updated });
});

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Sakala Mission Day 6: API now connects to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
