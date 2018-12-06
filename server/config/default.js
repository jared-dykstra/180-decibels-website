module.exports = {
  authDuration: 24 * 60 * 60,
  bcryptHashRounds: 9, // <-- See: https://www.npmjs.com/package/bcrypt#a-note-on-rounds
  idCookieName: 'id',
  idDuration: 10 * 365 * 24 * 60 * 60,
  profileCookieName: 'profile',
  jwtSecret: 'your-jwt-secret'
}
