// import express
const express = require("express");
const isAuth = require("./middleware/auth");

// instance of all methods const app
const app = express();
// console.log(app);

let users = [
  { id: 1, name: "John", age: 15 },
  { id: 2, name: "Peter", age: 20 },
];

// CRUD
// Create=>POST
// Read=>GET
// Update=>PUT
// DELETE=>delete

// to use json type
// middleware global
app.use(express.json()); //bodyparser
app.use(isAuth);

// create a route =>
// Method:GET
// path: /
app.get("/", (request, response) => {
  response.send("hello world");
});

// endPoint
// Method:GET
// path: /users
app.get("/users", (req, res) => {
  res.send({ msg: "all users", users: users });
});

// Get User by id
// method :GET
// Path : /users/:id
app.get("/users/:id", (req, res) => {
  //res.send(req.params);
  //   les parametres sont au niveau du URL

  const user = users.find((el) => el.id == req.params.id);
  if (!user) {
    return res.status(400).send({ msg: "user dont exist" });
  }
  return res.send(user);
});

// Method: POST
// URL : /users/post_user
// it needs a body to post it
app.post("/users/post_user", isAuth, (req, res) => {
  //   console.log(req.body);
  const newUser = req.body;
  //   method1:
  //   users = [...users, { ...newUser, id: Date.now() }];
  users.push({ ...newUser, id: Date.now() });
  res.send({ msg: "user added", users });
});

// EDIT=> PUT
// id user=>parametre
// data=>body
app.put("/users/update_user/:id", (req, res) => {
  //   user = req.body;
  users = users.map((user) =>
    user.id == req.params.id ? { ...user, ...req.body } : user
  );
  res.send({ msg: "user updated", users });
});

// delete
app.delete("/delete_user/:id", (req, res) => {
  // parametre
  const id = req.params.id;
  users = users.filter((el) => el.id != id);
  res.send({ msg: "user deleted", users });
});

// port
const port = 5000;

// create server
app.listen(port, (err) => {
  err ? console.error(err) : console.log(`server is running on ${port}`);
});
