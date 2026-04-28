<<<<<<< HEAD:config/databaseM.js
const mongoose = require('mongoose');
const connectDB = async() => {
    await mongoose.connect(
        process.env.DB_CONNECTION_SECRET
    );
}


module.exports = connectDB;
=======
const mongoose = require('mongoose');
const connectDB = async() => {
    await mongoose.connect(
        process.env.DB_CONNECTION_SECRET
    );
}


module.exports = connectDB;
>>>>>>> 9e03bf0ce792ee7b06ae6b2733679229f975d09c:src/config/databaseM.js
