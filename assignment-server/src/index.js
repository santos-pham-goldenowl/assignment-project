import "module-alias/register";

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import db from "@models";
import { secureRoutes, publicRoutes } from "@modules";
import passport from "passport";
import cors from "cors";

require("@middlewares/passportToken");
// import { handleErrorResponse } from 'src/utils/response';
const app = express();
app.use(express.static(path.join(__dirname, "./")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(passport.initialize());
app.use(cors());

// Test DB connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res, next) => {
  res.send("Hello word!");
});

// app.all('/api/*', authMiddleware);
app.use("/api", publicRoutes);
app.use("/api", passport.authenticate("jwt", { session: false }), secureRoutes);

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log("error: ", err);
  }

  res.status(500);
  let errorMsg =
    process.env.NODE_ENV === "development"
      ? err.message
      : "general server error!";
  if (err.status === 401 || err.status === 400 || err.status === 409) {
    console.log("errors from db: ", err.message);
    res.status(err.status);
    errorMsg = err.message;
  }

  // handleErrorResponse(res, false, errorMsg, (err.data || null));
  res.json({
    success: false,
    error_message: errorMsg,
  });
});

module.exports = app;
