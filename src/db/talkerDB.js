const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT * FROM talkers';
  const [result] = await connection.execute(query);

  return result;
};

module.exports = { findAll };