const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.CONNECTION_STRING);
    const connection = (await connect).connection;
    console.log("Database connected! ", connection.host, connection.name);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
