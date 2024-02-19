const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const uriDb = process.env.DB_HOST;
const PORT = process.env.PORT || 4000;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
