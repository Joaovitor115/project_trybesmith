const express = require('express');
const ageValidation = require('./middlewares/ageValidation');
const loginMiddlewares = require('./middlewares/loginMiddlewares');
const logintypesMiddlewares = require('./middlewares/logintypesMiddlewares');
const nameValidation = require('./middlewares/nameValidation');
const rateValidation = require('./middlewares/rateValidation');
const talkValidation = require('./middlewares/talkValidation');
const tokenValidation = require('./middlewares/tokenValidation');
const watchedAtValidation = require('./middlewares/watchedAtValidation');
const { readFile, token, write, deleteFile } = require('./talkerFunctions');

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
  res.status(200).json({
    token: token(16),
  });
});

app.post('/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const data = req.body;
    const result = await write(data);
    return res.status(201).json(result);
  });

// app.put('/talker/:id',
//   tokenValidation,
//   nameValidation,
//   ageValidation,
//   talkValidation,
//   watchedAtValidation,
//   rateValidation,
//   async (req, res) => {
//     const { id } = req.params;
//     const data = req.body;
//     const talkers = await readFile();
//     const newData = talkers.map((a) => {
//       if (a.id !== Number(id)) return a;
//       return { ...a, ...data };
//     });
//     JSON.stringify(newData);
//     fs.writeFile(talkerPath, newData);
//   });
app.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  await deleteFile(id);
  return res.status(204).json('');
});