const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const AuthUser = require('../models/AuthUser') // ← check this exists

const JWT_SECRET = process.env.JWT_SECRET

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    const existingUser = await AuthUser.findOne({ username })
    if (existingUser) return res.status(400).json({ error: 'User already exists' })
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new AuthUser({ username, password: hashedPassword })
    await newUser.save()
    res.status(201).json({ message: 'User created' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await AuthUser.findOne({ username })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' })
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, username: user.username })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router