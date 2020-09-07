import "module-alias/register";

import express from "express";
import path from "path";
import db from "@models";
import routes from "@modules";
const app = express();
app.use(express.static(path.join(__dirname, "./")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hello ALAN DI BO");
});

app.get("/product", (req, res, nex) =>
  res.json({
    id: "abc24",
    name: "Samsung Galaxy",
    color: "black",
    category: "mobile",
    url:
      "https://cdn.tgdd.vn/Products/Images/42/217937/samsung-galaxy-s20-ultra-600x600-1-400x400.jpg",
    price: "20000000",
  })
);
// Test DB connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/api", routes);

// Error handling
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log("error: ", err);
  }

  // Custom Errorhandling
  // E.g: Call sentry.io (err)

  res.status(500);
  let errorMsg =
    process.env.NODE_ENV === "development"
      ? err.message
      : "general server error!";
  if (err.status === 401 || err.status === 400 || err.status === 409) {
    res.status(err.status);
    errorMsg = err.message;
  }

  res.json({
    success: false,
    error_message: errorMsg,
  });
});

module.exports = app;
