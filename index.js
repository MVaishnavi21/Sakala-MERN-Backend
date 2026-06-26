require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/auth', require('./routes/AuthUser'));
app.use('/users', require('./routes/users'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected. Day 6 win.'))
  .catch(err => console.error('DB Error:', err));

app.listen(PORT, () => console.log(`Server running on ${PORT}`))

app.get('/profile', (req, res) => {
  res.json({ name: 'Vaishnavi', mission: 'Sakala Mission', day: 5, skills: ['Node.js', 'Git', 'JavaScript', 'Express', 'POST'], isShipping: true });
});

app.post('/profile', async (req, res) => {
  try {
    const { name, age, email } = req.body  // add email

    // BACKEND VALIDATION STARTS
    if (!name || !age || !email) {
      return res.status(400).json({ message: 'Name, age, and email are required' })
    }
    
    if (typeof age !== 'number' && isNaN(Number(age))) {
      return res.status(400).json({ message: 'Age must be a number' })
    }
    
    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format' })
    }
    // BACKEND VALIDATION ENDS 

    const newUser = await User.create({ name, age, email })  // add email
    res.status(201).json({ message: 'Shipped!', data: newUser })
  } catch (err) {
    // THIS BLOCK FOR DUPLICATE EMAIL
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists. Use a different email.' })
    }
    res.status(500).json({ message: err.message })
  }
})

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

// DELETE user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //returns the updated doc
    )
    res.json({ message:'User updated', data: updatedUser })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user'})
  }
})