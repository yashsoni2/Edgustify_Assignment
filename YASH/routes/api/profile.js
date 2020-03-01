const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");
const Profile = require("../../models/Profile");

const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "profile works" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .them(profile => {
        if (!profile) {
          error.noprofile = "there is no profile";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get("/all", (req, res) => {
  Profile.find()
    .then(profiles => {
      if (!profile) {
        error.noprofile = "there is no profile";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "there is no profile of" }));
});

router.get("/user/:user", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .then(profile => {
      if (!profille) {
        error.noprofile = "there is no profile";
        res.ststus(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({ profile: "there is no profile of" }));
});

router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
      if (!profille) {
        error.noprofile = "there is no profile";
        res.ststus(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.company) profileFields.company = req.body.company;
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        profile
          .findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
          .then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: profileField.handle }).then(profile => {
          if (profile) {
            error.handle = " that handle already exist";
            res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
