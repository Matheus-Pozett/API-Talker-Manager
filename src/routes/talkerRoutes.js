const { Router } = require('express');
const readTalkers = require('../utils/file');

const router = Router();

router.get('/', async (req, res) => {
  const talkers = await readTalkers();
  console.log(talkers);
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const talkers = await readTalkers();

  const findTalker = talkers.find((talker) => talker.id === id);

  if (!findTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(findTalker);
});

module.exports = router;