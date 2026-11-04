const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn= await mongoose.connect('mongodb+srv://es0556726468_db_user:2qtyioMDOTBe1j53@cluster0.jj5n5rh.mongodb.net')
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
 module.exports = connectDB

