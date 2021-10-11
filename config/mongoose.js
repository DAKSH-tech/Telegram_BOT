const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(`mongodb://${process.env.DB_URL}`, 
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!'); 
});
module.exports=db;
