const db = require('../../data/db-config.js');


const getAll = () => {
  return db('accounts');
}

const getById = id => {
  const account = db.first('*').from('accounts').where({ id });
  return account;
}

const create = async newAccount => {
  const account = await db('accounts').insert(newAccount);
  return account;
}

const updateById = async (id, account) => {
  return db('accounts').update(account).where({ id });
}

const deleteById = async id => {
  return db('accounts').del().where({ id });
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
