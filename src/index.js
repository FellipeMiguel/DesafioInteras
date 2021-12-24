const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());
const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const { id } = request.params;

  const user = users.find(user => user.username === username || user.id === id);
   if(!user){
    return response.status(404).json({ error: "mensagem de erro" });
  }
  request.user = user;
  return next();
}

app.post("/users", (request, response) =>{
  const {name, username} = request.body;

	const usernameAlreadyExists = users.some(
		(user) => user.username === username
	);

	if (usernameAlreadyExists) {
		return response.status(400).json({ error: "mensagem de erro" });
	}

	const user = { 
    id: uuidv4(), 
    name, 
    username, 
    statement: []
  }
  
  users.push(user);
  
  return response.status(201).json(user);
});

app.get('/users', (request, response) => {
  const { user } = request;

	return response.json(users);
});

app.get('/users/:id', checksExistsUserAccount,(request, response) => {
  
})


app.put('/users/:id', checksExistsUserAccount,(request, response) => {
  const { username, name } = request.body;
  const { user } = request;
  user.username = username;
  user.name = name;

  return response.json(user);
});


app.delete('/users/:id', checksExistsUserAccount,(request, response) => {
  const { user } = request;
  
	users.splice(user, 1);

	return response.status(201).json(users);
});

module.exports = app;