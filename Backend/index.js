const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const whatsappRoutes = require('./routes/whatsapp.js');
const cors = require('cors')


require('dotenv').config();

const app = express();

// Connect Database
connectDB();

app.use(cors()); // Enable CORS for all routes
// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use('/api/whatsapp', whatsappRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
