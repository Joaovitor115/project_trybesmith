const express = require('express');
const { readFile } = require('./talkerFunctions');

const app = express();

app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
const data = await readFile();
if (!data) {
  return res.status(200).json([]);
}
console.log(data, 'data');
return res.status(200).json(data);
});