const { body, validationResult } = require("express-validator");
const Complaint = require("../db/models/complaint");
const authMiddleware = require("../middleware/auth");

const routes = require("express").Router();
routes.post(
  "/",
  [
    authMiddleware,
    body("text").not().isEmpty().trim().escape().withMessage("Empty Complaint"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let complaint = createNewComplaint(req);
    try {
      await complaint.save();
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
      return;
    }
  }
);

routes.put(
  "/",
  [
    authMiddleware,
    body("id").trim().escape().not().isEmpty(),
    body("text").trim().escape().not().isEmpty(),
    body("status").trim().escape().not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let userType = req.userType;
    if (userType !== "admin") {
      res.status(401).send();
      return;
    }
    try {
      await Complaint.findOneAndUpdate(
        { _id: req.body.id },
        { status: req.body.status }
      ).exec();
      res.send();
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

routes.get("/", [authMiddleware], async (req, res) => {
  const userId = req.userID;
  try {
    let compaints = await Complaint.find({ userId })
      .select("text status _id")
      .exec();
    res.send(compaints.map((c) => mapComplaintsResponse(c)));
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    return;
  }
});

mapComplaintsResponse = (complaint) => {
  return { text: complaint.text, status: complaint.status, id: complaint._id };
};

createNewComplaint = (req) => {
  const userId = req.userID;
  return new Complaint({
    text: req.body.text,
    userId,
    status: "pending",
  });
};

module.exports = routes;
