const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todos";

console.log("Connecting to MongoDB at:", MONGO_URI);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection established successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB connection lost. Attempting to reconnect...");
});

module.exports = mongoose;
