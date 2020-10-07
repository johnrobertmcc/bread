const express = require("express");
const router = express.Router();
const Event = require("../../models/Event"); //don't see this on my folder
const validateEventInput = require("../../validation/event");

router.post("/new", (req, res) => {
  

  const { errors, isValid } = validateEventInput(req.body);
  
debugger
  if (!isValid) {
    return res.status(400).json(errors);
  }
  

  const newEvent = new Event(
    {
    name: req.body.name,
    attendees: JSON.parse(req.body.attendees),
  });

  
  newEvent.save().then((event) => res.json(event));
});

router.get("/", (req, res) => {
  Event.find((error, events) => {
    if (error) return res.status(404).json({ error });

    res.json(events.map((event) => event));
  });
});

router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((error) =>
      res.status(404).json({ noEventFound: "No Event found with that ID" })
    );
});

module.exports = router;