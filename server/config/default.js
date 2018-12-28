module.exports = {
  authDuration: 24 * 60 * 60,
  bcryptHashRounds: 9, // <-- See: https://www.npmjs.com/package/bcrypt#a-note-on-rounds
  idCookieName: 'id',
  idDuration: 10 * 365 * 24 * 60 * 60,
  profileCookieName: 'profile',
  jwtSecret: 'your-jwt-secret',
  agileCrm: {
    restApiUser: 'jared.dykstra@180decibels.com',
    restApiKey: 'vhh6ubgghfc58g74sbggcdp32v',
    restEndpoint: 'https://decibels.agilecrm.com/dev/'
    // uidKerri: 6071708163375104,
    // uidDayton: 5907182528888832,
    // uidJared: 4634476193906688
  }
}
