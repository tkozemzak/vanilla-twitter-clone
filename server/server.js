const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const monk = require("monk");

const app = express();

const db = monk("localhost/twitter-clone");
//get all tweets from db. create tweets collection if it does not exist
const tweets = db.get("tweets");
//get all users from db. create users collection if it does not exist

const users = db.get("users");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on: ", port);
});

//server side submission validation
const isValidTweet = (tweet) => {
  if (tweet.content.length > 0 && tweet.content.length < 280) {
    return true;
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
  console.log("req.body", req.body);
  if (isValidTweet(req.body)) {
    const tweet = {
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
//sign up process - write to User collection in DB
app.post("/signup", (req, res, next) => {
  const user = {
    firstName: req.body.firstName.toString(),
    lastName: req.body.lastName.toString(),
    email: req.body.email.toString(),
    password: req.body.password.toString(),
    created_at: new Date(),
  };

  //check if user with this email exists
  users.findOne({ email: user.email }).then((foundUser) => {
    foundUser
      ? res.send("User with this email already exists")
      : users
          .insert(user)
          .then((createdUser) => {
            //send new user info back to client
            return res.json(createdUser);
          })
          .catch(next);
  });
});

//login
app.post("/login", (req, res, next) => {
  const user = {
    email: req.body.email.toString(),
    password: req.body.password.toString(),
  };
  users
    .findOne({ email: user.email })
    .then((foundUser) => {
      foundUser.password == user.password
        ? //send new user info back to client
          res.json(foundUser)
        : res.send(401);
    })
    .catch(next);
});
