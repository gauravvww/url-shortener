const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const connectDB = require('./db');

const app = express();
const port = 3000;
let db;

app.use(cors());
app.use(express.json());

connectDB().then(database => {
  db = database;
  console.log("Database connection established for Express routes.");
}).catch(error => {
  console.error("Failed to establish database connection on server startup:", error);
  process.exit(1);
});

app.post('/shorten', async (req, res) => {
  try {
    const longURL = req.body.longURL;
    console.log('Received URL to shorten:', longURL);

    if (!longURL || typeof longURL !== 'string' || !longURL.startsWith('http')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL format. URL must start with http or https.',
      });
    }

    if (!db) {
      console.error('Database connection not established.');
      return res.status(500).json({
        success: false,
        message: 'Database not available. Please try again.',
      });
    }

    const urlsCollection = db.collection('urls');
    const urlDocument = {
      shortCode: nanoid(7),
      longURL: longURL,
      createdAt: new Date(),
    };

    await urlsCollection.insertOne(urlDocument);

    const shortURL = `${req.protocol}://${req.get('host')}/${urlDocument.shortCode}`;

    res.json({
      success: true,
      shortURL: shortURL
    });
  } catch (error) {
    console.error("Failed to shorten URL:", error);
    res.status(500).json({ success: false, message: 'Server error: Could not shorten URL.' });
  }
});

app.get('/:shortCode', async (req, res) => {
  try {
    const shortCode = req.params.shortCode;

    if (!db) {
      console.error('Database not connected when trying to redirect.');
      return res.status(500).json({
        success: false,
        message: 'Database not available. Please try again.',
      });
    }

    const urlsCollection = db.collection('urls');
    const urlDocument = await urlsCollection.findOne({ shortCode: shortCode });

    if (urlDocument) {
      res.redirect(urlDocument.longURL);
    } else {
      res.status(404).json({
        success: false,
        message: 'Short URL not found.',
      });
    }
  } catch (error) {
    console.error('Failed to retrieve long URL for redirection:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Could not process request.',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
