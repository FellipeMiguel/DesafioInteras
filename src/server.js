const app = require('./');

const port = 3333

app.listen(port, () => {
  console.log(`API inicializada na porta: ${port}`)
});