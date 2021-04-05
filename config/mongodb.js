require('dotenv').config();

module.exports = {
  DB_URL: (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/newsexplorerdb' : process.env.DB_URL,
};
