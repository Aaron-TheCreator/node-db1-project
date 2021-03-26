const router = require('express').Router();
const Accounts = require('./accounts-model.js');
const checkAccountPayload = require('./accounts-middleware.js').checkAccountPayload;
const checkAccountNameUnique = require('./accounts-middleware.js').checkAccountNameUnique;
const checkAccountId = require('./accounts-middleware.js').checkAccountId;
const ExpressError = require('../expressError.js');

router.get('/', async (req, res, next) => {
  try {
    res.json(await Accounts.getAll());
  } catch (err) {
    next(new ExpressError(err, 500));
  }
})

router.get('/:id', checkAccountId, (req, res) => {
  res.status(200).json(req.account);
})

router.post('/', checkAccountNameUnique, checkAccountPayload , async (req, res, next) => {
  try {
    const data = await Accounts.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(new ExpressError(err))
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const data = await Accounts.updateById(req.params.id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(new ExpressError(err, 500))
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    await Accounts.deleteById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message })
})

module.exports = router;
