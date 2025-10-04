/* eslint-disable max-lines-per-function */
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

const updateTalker = async (id, updatedData) => {
  try {
    const allTalkers = await readTalkers();
    const talkerIndex = allTalkers.findIndex((t) => t.id === Number(id));
    
    if (talkerIndex === -1) {
      return null;
    }
    
    const updatedTalker = { id: Number(id), ...updatedData };
    allTalkers[talkerIndex] = updatedTalker;
    
    await fs.writeFile(
      path.resolve(__dirname, TALKERS_JSON_PATH), 
      JSON.stringify(allTalkers, null, 2),
    );
    
    return updatedTalker;
  } catch (error) {
    console.error(`Erro ao atualizar o arquivo: ${error.message}`);
    throw error;
  }
};

const deleteTalker = async (id) => {
  const talkers = await readTalkers();

  const deleted = talkers.filter((t) => t.id !== id);

  if (deleted.length === talkers.length) {
    return false;
  }

  await fs.writeFile(path.resolve(__dirname, TALKERS_JSON_PATH), JSON.stringify(deleted, null, 2));
  return true;
};

module.exports = { readTalkers, writeTalker, updateTalker, deleteTalker };