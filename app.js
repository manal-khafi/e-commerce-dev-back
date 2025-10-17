const express = require('express');
const sequelize = require('./config/db'); 
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
const cartRoutes = require('./routes/cartRoute');
const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/carts', cartRoutes);

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


sequelize.sync()
  .then(() => console.log('All models synced'))
  .catch(err => console.error(err));

