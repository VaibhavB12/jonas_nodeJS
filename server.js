const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');


mongoose.connect(process.env.DATABASE_URL)
  .then(con => console.log('DB connected ...'))
  .catch(err => {
    console.error('DB error ...',err);
  });



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
