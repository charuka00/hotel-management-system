const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const connectDB = require('./db');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS so frontend can talk to backend

// --- NEW CODE STARTS HERE ---
// Define Routes
app.use('/api/auth', require('./routes/auth'));
// --- NEW CODE ENDS HERE ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});