const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const database = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "igor",
    password: "",
    database: "smart"
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// const database = {
//   users: [
//     {
//       id: "123",
//       name: "John",
//       email: "john@gmail.com",
//       password: "john",
//       entries: 0,
//       joined: new Date()
//     },
//     {
//       id: "124",
//       name: "shushu",
//       email: "shushu@gmail.com",
//       password: "shushu",
//       entries: 0,
//       joined: new Date()
//     }
//   ]
// };

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    // res.json("success");
    res.json(database.users[0]);
  } else {
    res.status(400).json("error loggin in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  let found = false;
  const { id } = req.params;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      res.json(user);
    }
  });
  if (!found) res.status(404).json("user not found");
});

app.put("/image", (req, res) => {
  let found = false;
  const { id } = req.body;
  database.users.forEach(user => {
    if (user.id === id) {
      user.entries++;
      found = true;
      res.json(user.entries);
    }
  });
  if (!found) res.status(404).json("user not found");
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
