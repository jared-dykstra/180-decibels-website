module.exports = {
  authDuration: 24 * 60 * 60,
  bcryptHashRounds: 9, // <-- See: https://www.npmjs.com/package/bcrypt#a-note-on-rounds
  idCookieName: 'id',
  idDuration: 10 * 365 * 24 * 60 * 60,
  profileCookieName: 'profile',
  jwtSecret: 'your-jwt-secret',
  agileCrm: {
    restApiKey: 'vhh6ubgghfc58g74sbggcdp32v',
    // restEndpoint: 'https://decibels.agilecrm.com/dev/'
    restEndpoint:
      'https://jared.dykstra@180decibels.com:vhh6ubgghfc58g74sbggcdp32v@decibels.agilecrm.com/dev/'
  }
}
