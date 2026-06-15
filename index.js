require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
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

app.get('/', (req, res) => {
  res.send('Sakala Mission Day 6: API now connects to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
