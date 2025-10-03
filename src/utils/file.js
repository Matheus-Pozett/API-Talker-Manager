const fs = require('fs').promises;
const path = require('path');

const TALKERS_JSON_PATH = '../talker.json';

const readTalkers = async () => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKERS_JSON_PATH), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
    return [];
  }
};

const writeTalker = async (talker) => {
  try {
    const oldTalkers = await readTalkers();
    const nextId = oldTalkers.length ? Math.max(...oldTalkers.map((t) => t.id)) + 1 : 1;
    const newTalker = { id: nextId, ...talker };

    const newTalkers = [...oldTalkers, newTalker];

    await fs.writeFile(
      path.resolve(__dirname, TALKERS_JSON_PATH), JSON.stringify(newTalkers, null, 2), 'utf-8',
    );
    
    return newTalker;
  } catch (error) {
    console.error(`Erro ao escrever o arquivo: ${error.message}`);
  }
};

module.exports = { readTalkers, writeTalker };