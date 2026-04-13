const mongoose = require('mongoose');
const connectDB = async() => {
    await mongoose.connect(
        'mongodb+srv://dhimantamanjot_db_user:nDn4jn3q9rQjtbwZ@orgdb.h8akrsd.mongodb.net/dev'
    );
}


module.exports = connectDB;
