const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Allow CORS for the frontend
app.use(cors());
app.use(express.json());

// API route returning hardcoded data
app.get('/api/data', (req, res) => {
  res.json({
    success: true,
    data: {
      // message: 'Hello from the Express backend!',
      // items: [1, 2, 3, 4, 5],
      message: `Hello Muskaan. Kya krri tu?
               April Fool sunday monday go to school! 😈
               chi hona mujhe, nana bais bhi!
               mai akela khelletu, soot phenleko! 🩲
              mujhe akela khellena pasand!
              tujhe maartu mai timepass ku!
              Chappalan bhi jalaadaltu mai tere! 🩴
      `,
      timestamp: new Date().toISOString()
    }
  });
});

// Health check API
app.get('/health', (req, res) => {
  res.status(200).send('backend is running');
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
