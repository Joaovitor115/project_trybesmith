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

module.exports = {
  readFile,
  token,
};