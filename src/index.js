const express = require('express');
const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

// const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

app.post('/users', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.get('/users', (request, response) => {
  // Complete aqui
});

app.get('/users/:id', (request, response) => {
  // Complete aqui
})


app.put('/users/:id', (request, response) => {
  // Complete aqui
});


app.delete('/users/:id', (request, response) => {
  // Complete aqui
});

module.exports = app;