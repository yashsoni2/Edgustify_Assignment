const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const user = require("./routes/api/users");
const profile = require("./routes/api/profile");
const post = require("./routes/api/posts");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/post", post);

const port = process.env.port || 5000;
app.listen(port, () => console.log("server running ${port}"));
