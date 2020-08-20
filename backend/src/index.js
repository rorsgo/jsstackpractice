const express = require("express");

const server = express();
server.use(express.json());


const users = ["UserOne", "UserTwo", "UserThree"];

server.use((request, response, next) => {
  console.time("Request");
  console.log(`Method: ${request.method} | URL: ${request.url}`)
  next();
  console.timeEnd("Request");
});

server.get("/users/:index", (request, response) => {
  const { index } = request.params;
  return response.json(users[index]);
});

server.get("/users", (request, response) => {
  return response.json(users)
});

server.post("/users", (request, response) => {
  const { name } = request.body;
  users.push(name);
  return response.json(users);
});

server.put("/users/:index", (request, response) => {
  const { index } = request.params;
  const { name } = request.body;
  users[index] = name;
  return response.json(users);
});

server.delete("/users/:index", (request, response) => {
  const { index } = request.params;
  users.splice(index, 1);
  return response.json(users);
});

server.listen("3333");