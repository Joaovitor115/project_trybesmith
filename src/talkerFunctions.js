const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, './talker.json');

const readFile = async () => {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
};

module.exports = {
readFile,
};