const { Router } = require('express');
const readTalkers = require('../utils/file');

const router = Router();

router.get('/', async (req, res) => {
  const talkers = await readTalkers();
  console.log(talkers);
  res.status(200).json(talkers);
});

module.exports = router;