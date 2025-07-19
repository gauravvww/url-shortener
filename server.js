const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/shorten', (req, res) => {
  const longURL = req.body.longURL;
  console.log('Received URL to shorten:', longURL);

  const shortCode = nanoid(7); 
  const shortURL = `http://localhost:3000/${shortCode}`;

  res.json({
    success: true,
    shortURL: shortURL
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
