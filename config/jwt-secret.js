require('dotenv').config();

// module.exports = {
//  JWT_SECRET: (process.env.NODE_ENV !== 'production') ? 'JWT_SECRET' : process.env.JWT_SECRET,
// };

const { JWT_SECRET = 'wtf' } = process.env;
module.exports = {
  JWT_SECRET,
};
