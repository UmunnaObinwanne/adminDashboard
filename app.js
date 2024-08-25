import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';


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



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
