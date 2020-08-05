const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const User = require("../db/models/user");

const routes = require("express").Router();
routes.post(
  "/signup",
  [
    body("username").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await bcrypt.hash(req.body.password, saltRounds, async function (
      err,
      hash
    ) {
      let user = new User({
        username: req.body.username,
        password: hash,
        type: "user",
      });

      try {
        await user.save();
        res.status(200).send();
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
        return;
      }
    });
  }
);

routes.post(
  "/login",
  [
    body("username").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    let userFromDB = await User.findOne({
      username: req.body.username,
      type: "user",
    }).exec();
    if (!userFromDB) {
      res.status(400).send({ Error: "Unknown username or password" });
      return;
    }
    bcrypt.compare(req.body.password, userFromDB.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      if (!isMatch) {
        res.status(400).send({ Error: "Unknown username or password" });
        return;
      }

      res.send({
        token: jwt.sign(
          {
            username: userFromDB.username,
            id: userFromDB._id,
            type: userFromDB.type,
          },
          config.jwtSecret
        ),
      });
      return;
    });
  }
);

module.exports = routes;
