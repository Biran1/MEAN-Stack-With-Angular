const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
  /* uri: 'mongodb://localhost:27017/mean-angular-2', */ // Databse URI and database name
  uri: 'mongodb://bir:birms1234@ds129936.mlab.com:29936/todo',
  secret: crypto, // Cryto-created secret
  db: 'todo' // Database name
}
