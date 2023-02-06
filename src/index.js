const express = require('express');
const loginMiddlewares = require('./middlewares/loginMiddlewares');
const logintypesMiddlewares = require('./middlewares/logintypesMiddlewares');
const { readFile, token } = require('./talkerFunctions');

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
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const data = await readFile();
  const { id } = req.params;
  const FoundUser = data.find((u) => u.id === Number(id));
  if (!FoundUser) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).json(FoundUser);
});

app.post('/login', loginMiddlewares, logintypesMiddlewares, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'faltando email ou password',
    });
  }
  return res.status(200).json({
    token: token(16),
  });
});
