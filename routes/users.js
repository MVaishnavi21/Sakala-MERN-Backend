const express = require('express')
const router = express.Router()
const User = require('../models/User') // ← import the model
const auth = require('../middleware/auth') // ← your middleware

// GET all users - PROTECTED
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create user - PROTECTED 
router.post('/', auth, async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE user - PROTECTED
router.delete('/:id', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router