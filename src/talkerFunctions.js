const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, './talker.json');

const readFile = async () => {
  const data = await fs.readFile(talkerPath);
  return JSON.parse(data);
};
function token(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
const write = async (body) => {
  const data = await readFile();
  const newData = {
    id: data[data.length - 1].id + 1,
    ...body,
  };
  const allData = JSON.stringify([
    ...data, newData,
  ]);
  await fs.writeFile(talkerPath, allData);
  return newData;
};
const deleteFile = async (id) => {
  const data = await readFile();
  const newData = data.filter((a) => a.id !== Number(id));
  const allData = JSON.stringify(newData);
  await fs.writeFile(talkerPath, allData);
};
const FindByQuery = async (query) => {
const data = await readFile();
const talkers = data.filter((talker) => talker.name.includes(query));
return talkers;
};
module.exports = {
  readFile,
  token,
  write,
  deleteFile,
  FindByQuery,
};