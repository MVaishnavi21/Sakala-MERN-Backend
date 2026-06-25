const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET // add to Render env vars

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hashed })
    res.status(201).json({ message: "User created" })
  } catch (e) {
    res.status(400).json({ error: "Username already exists" })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) return res.status(400).json({ error: "User not found" })
  
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ error: "Invalid password" })

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' })
  res.json({ token, username: user.username })
})

module.exports = router