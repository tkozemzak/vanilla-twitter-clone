const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("listening on: ", port);
});

app.get("/", (req, res) => {
  console.log("GET /");
  res.json({
    message: "from server",
  });
});

app.post("/tweets", (req, res) => {
  console.log("req.body:", req.body);
  res.send("yes");
});
