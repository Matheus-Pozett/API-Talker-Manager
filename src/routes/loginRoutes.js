const { Router } = require('express');
const crypto = require('crypto');
const { validadeEmail, validadePassword } = require('../middlewares/login');

const router = Router();

const generateToken = () => {
  const tamanho = 8;
  const buffer = crypto.randomBytes(tamanho);
  const token = buffer.toString('hex');
  return token;
};

router.post('/', validadeEmail, validadePassword, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;