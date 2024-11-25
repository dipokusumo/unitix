const express = require('express');
const app = express();
const port = 3000;

// Route dasar
app.get('/', (req, res) => {
  res.send('UniTIX!');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});