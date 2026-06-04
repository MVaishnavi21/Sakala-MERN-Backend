const express = require('express');
const app = express();
const PORT = 3000;

const dev = {
  name: "Vaishnavi",
  mission: "Sakala Mission",
  day: 4,
  skills: ["Node.js", "Git", "JavaScript", "Express"],
  isShipping: true
};

app.get('/profile', (req, res) => {
  res.json(dev);
});

app.get('/', (req, res) => {
  res.send('Sakala Mission Day 4: API is LIVE');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
});
