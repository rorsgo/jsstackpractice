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

function checkUserParam(request, response, next){
  if(!request.body.name){
    return response.status(400).json({ error: "User name is required."});
  }
  return next();
}

function checkUserExists(request, response, next){
  const user = users[request.params.index];
  
  if(!user){
    return response.status(400).json({ error: "User doesn't exists."});
  }

  request.user = user;

  return next();
}

server.get("/users/:index", checkUserExists, (request, response) => {
  return response.json(request.user);
});

server.get("/users", (request, response) => {
  return response.json(users)
});

server.post("/users", checkUserParam, (request, response) => {
  const { name } = request.body;
  users.push(name);
  return response.json(users);
});

server.put("/users/:index", checkUserParam, checkUserExists, (request, response) => {
  const { index } = request.params;
  const { name } = request.body;
  users[index] = name;
  return response.json(users);
});

server.delete("/users/:index", checkUserExists, (request, response) => {
  const { index } = request.params;
  users.splice(index, 1);
  return response.json(users);
});

server.listen("3333");