/* eslint-disable complexity */
const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : authorization;

  if (!token || token.length !== 16 || typeof token !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (typeof age !== 'number' || age < 18 || !Number.isInteger(age)) {
    return res.status(400).json(
      { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
    );
  }
  next();
};

const validateWatchedAt = (watchedAt, res) => {
  if (!watchedAt) {
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    return false;
  }

  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(watchedAt)) {
    res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    });
    return false;
  }

  return true;
};

const validateRate = (rate, res) => {
  if (rate === undefined || rate === null || rate === '') {
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    return false;
  }
  
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    res.status(400).json(
      { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
    );
    return false;
  }

  return true;
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  if (!validateWatchedAt(talk.watchedAt, res)) return;
  if (!validateRate(talk.rate, res)) return;

  next();
};

module.exports = { validateToken, validateName, validateAge, validateTalk };