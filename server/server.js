const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on: ", port);
});

app.get("/", (req, res) => {
  res.json({
    message: "from server",
  });
});

app.post("/tweets", (req, res) => {
  console.log("req.body:", req.body);
  if (req.body.name.length <= 0 || req.body.content.length <= 0) {
    res.status(400).send("Invalid Input");
  } else if (req.body.name.length > 20 || req.body.content.length > 280) {
    res.status(400).send("You have exceeded the character limit");
  } else {
    res.send(req.body);
  }
});
