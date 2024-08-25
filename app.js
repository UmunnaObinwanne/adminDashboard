import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import pageRoutes from './routes/pajes.js';
import { adminJs, adminJsRouter } from './adminjsSetup.js'; // Import AdminJS setup



const app = express();

dotenv.config();

// Enable trust proxy
app.set('trust proxy', 1);

// Session middleware configuration
app.use(session({
  secret: process.env.MY_APP_COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none'
  }
}));

// Database connection
const dbPassword = process.env.DB_PASSWORD;
const uri = `mongodb+srv://broadwaymarketingconsults:${dbPassword}@carmartuk.0chjo.mongodb.net/carmart?retryWrites=true&w=majority&appName=CarmartUK`;

mongoose.connect(uri, {})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', pageRoutes);
// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});



// Use AdminJS router
app.use(adminJs.options.rootPath, adminJsRouter);
console.log(`AdminJS connected successfully at ${adminJs.options.rootPath}`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
