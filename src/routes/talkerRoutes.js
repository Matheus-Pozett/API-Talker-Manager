const { Router } = require('express');
const { readTalkers, writeTalker, updateTalker, deleteTalker, 
  findByQuery } = require('../utils/file');
const { validateToken, 
  validateAge, validateName, validateTalk } = require('../middlewares/talker');

const router = Router();

router.get('/', async (req, res) => {
  const talkers = await readTalkers();
  res.status(200).json(talkers);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readTalkers();

  if (!q) {
    return res.status(200).json(talkers);
  }
  const result = await findByQuery(q);

  return res.status(200).json(result);
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

router.put('/:id', 
  validateToken,
  validateAge,
  validateName,
  validateTalk, 
  async (req, res) => {
    const id = Number(req.params.id);
    const talkers = await readTalkers();

    const findTalker = talkers.find((talker) => talker.id === id);

    if (!findTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const talker = req.body;

    const result = await updateTalker(id, talker);

    res.status(200).json(result);
  });

router.delete('/:id', validateToken, async (req, res) => {
  const id = Number(req.params.id);

  const result = await deleteTalker(id);

  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(204).end();
});

module.exports = router;