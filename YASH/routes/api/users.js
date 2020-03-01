const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/Login");

const Users = require("../../models/User");
router.get("/test", (req, res) => res.json({ msg: "users workPPPPs" }));
router.post("/register", (req, res) => {
  const { errorsnisvalid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Users.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUsers.password, salt, (err, hash) => {
          if (err) throw err;
          newUsers.password = hash;
          newUsers
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (ismatch) {
        const payload = { id: user.id, name: user.name };
        jwt.sign(
          payload,
          keys.secretOfKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);

module.exports = router;
