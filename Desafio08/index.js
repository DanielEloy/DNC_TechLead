import express from 'express';
import { use } from 'react';
const app = express();
const port = 3300;
const users = [];

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send('Hello World');
});

app.post("/users", (req, res) => {
  //console.log(req);
  const body = req.body;
//console.log(body);
  users.push(body);
  res
  .status(201)
  .json({ users });
});

app.use(express.urlencoded({ extended: true }));


//app.listen(3000);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
