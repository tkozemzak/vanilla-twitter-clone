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

const isValidTweet = (tweet) => {
  if (tweet.name.length > 0 && tweet.name.length < 50) {
    if (tweet.content.length > 0 && tweet.content.length < 280) {
      return true;
    }
  } else {
    return false;
  }
};

app.post("/tweets", (req, res) => {
  if (isValidTweet(req.body)) {
    //insert in DB
  } else {
    res.status(400).send("Invalid Input");
  }
});
