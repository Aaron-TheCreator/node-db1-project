const ExpressError = require('../expressError.js');
const Accounts = require('./accounts-model.js');

exports.checkAccountPayload = (req, res, next) => {
  const newAccount = req.body;
  if (!newAccount.name && !newAccount.budget) {
    const err = new ExpressError('body must include name and budget', 400);
    next(err);
  } else if (typeof(newAccount.name) !== 'string') {
    const err = new ExpressError('name of account must be a string', 400);
    next(err);
  } else if ((newAccount.name.length < 3) || (newAccount.name.length > 100)) {
    const err = new ExpressError('name of the account must be between 3 and 100 charactcers', 400);
    next(err);
  } else if (typeof(newAccount.budget) !== 'number') {
    const err = new ExpressError('budget of account must be a number', 400);
    next(err);
  }  else if (newAccount.budget < 0 || newAccount > 1000000) {
    const err = new ExpressError('budget of account is too large or too small', 400);
    next(err);
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const newAccount = req.body;
  try {
    const accounts = await Accounts.getAll();
    console.log(accounts);
    const bool = accounts.filter((account) => {
      account.name = newAccount.name;
    })
    console.log(bool);
    
    if (!bool) {
      const err = new ExpressError('account name has already been taken',400);
      next(err)
    } else {
      next();
    }
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    if (account) {
      req.account = account;
      next();
    } else {
      const err = new ExpressError('ID not found', 404);
      next(err);
    }
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}
