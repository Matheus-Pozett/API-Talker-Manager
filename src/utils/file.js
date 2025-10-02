const fs = require('fs').promises;
const path = require('path');

const readTalkers = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
    return [];
  }
};

module.exports = readTalkers;