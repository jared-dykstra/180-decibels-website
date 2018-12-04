module.exports = {
  authDuration: 60 * 60 * 24,
  bcryptHashRounds: 9, // <-- See: https://www.npmjs.com/package/bcrypt#a-note-on-rounds
  idCookieName: 'id',
  profileCookieName: 'profile',
  jwtSecret: 'your-jwt-secret'
}
