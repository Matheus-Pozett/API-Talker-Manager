const { Router } = require('express');
const crypto = require('crypto');
const { validateEmail, validatePassword } = require('../middlewares/login');

const router = Router();

const generateToken = () => {
  const tamanho = 8;
  const buffer = crypto.randomBytes(tamanho);
  const token = buffer.toString('hex');
  return token;
};

router.post('/', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;