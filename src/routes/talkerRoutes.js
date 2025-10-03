const { Router } = require('express');
const { readTalkers, writeTalker } = require('../utils/file');
const { validateToken, 
  validateAge, validateName, validateTalk } = require('../middlewares/talker');

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

router.post('/', 
  validateToken,
  validateAge,
  validateName,
  validateTalk,
  async (req, res) => {
    const talker = req.body;
    const result = await writeTalker(talker);
    res.status(201).json(result);
  });

module.exports = router;