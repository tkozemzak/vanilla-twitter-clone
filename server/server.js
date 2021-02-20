const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const monk = require("monk");

const app = express();

const db = monk("localhost/twitter-clone");
const tweets = db.get("tweets");

app.use(cors());
app.use(express.json());

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

app.get("/tweets", (req, res) => {
  tweets.find().then((tweets) => {
    res.json(tweets);
  });
});

app.post("/tweets", (req, res, next) => {
  if (isValidTweet(req.body)) {
    //insert in DB
    const tweet = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created_at: new Date(),
    };
    tweets
      .insert(tweet)
      .then((createdTweet) => {
        res.json(createdTweet);
      })
      .catch(next);
  } else {
    res.status(400).send("Invalid Input");
  }
});
