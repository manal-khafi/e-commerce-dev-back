require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoute');
const app = express();
// secure API
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
//cookieParser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// HTTP headres
app.use(helmet());

app.use(express.json());

//cors
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);


sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL with Sequelize!');
  })
  .catch((err) => {
    console.error('Unable to connect to database:', err);
  });
  
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL with Sequelize!');

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log('Models synced successfully');
    }

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();
