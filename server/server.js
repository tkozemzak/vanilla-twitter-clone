const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const monk = require("monk");

const app = express();

const db = monk("localhost/twitter-clone");
//get all tweets from db. create tweets collection if it does not exist
const tweets = db.get("tweets");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on: ", port);
});

app.get("/", (req, res) => {
  res.json({
    message: "Nothing Here",
  });
});
//server side submission validation
const isValidTweet = (tweet) => {
  if (tweet.name.length > 0 && tweet.name.length < 50) {
    if (tweet.content.length > 0 && tweet.content.length < 280) {
      return true;
    }
  } else {
    return false;
  }
};
//retrieve all tweets from db and send to client
app.get("/tweets", (req, res) => {
  tweets.find().then((tweets) => {
    res.json(tweets);
  });
});
//accept tweet from front end and write to db
app.post("/tweets", (req, res, next) => {
  if (isValidTweet(req.body)) {
    const tweet = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created_at: new Date(),
    };
    tweets
      .insert(tweet)
      .then((createdTweet) => {
        //send new tweet back to client to append to DOM
        return res.json(createdTweet);
      })
      .catch(next);
  } else {
    res.status(400).send("Invalid Input");
  }
});
