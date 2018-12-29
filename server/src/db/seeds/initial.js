exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  await knex('users').del()
  // Inserts seed entries
  await knex('users').insert([
    {
      createdAt: new Date(),
      deletedAt: null,
      uid: '5ea90acf-9f79-405d-9648-69c2b2014557',
      aliases: JSON.stringify([]),
      email: 'jared.dykstra@gmail.com',
      properties: JSON.stringify({
        firstName: 'Jared',
        lastName: 'Dykstra',
        phone: '403.837.4544',
        company: 'Shef Services, Inc'
      }),
      hashedPassword:
        '$2b$04$LiKBXR05pIeNIrXooTxpoeetfV0.WWTIX3dRvDQnO.1P66QHtvzGS'
    }
  ])
}
