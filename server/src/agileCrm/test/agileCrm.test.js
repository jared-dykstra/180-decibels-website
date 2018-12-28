import { createContact, TAG_GET_STARTED } from '../agileCrm'

it('creates a contact', async () => {
  // jest.setTimeout(30000)

  try {
    const result = await createContact({
      tags: [TAG_GET_STARTED],
      firstName: 'first name',
      lastName: 'last name',
      title: 'Senior QA',
      company: 'my company',
      email: 'foo@bar.com',
      phone: '+1 403 837-4544'
    })
    console.log(
      `Created AgileCRM Contact ID=${JSON.stringify(result, null, 2)}`
    )
    expect(result.id).toBeDefined()
  } catch (err) {
    console.log(`Test Error: ${err}`)
    throw err
  }
})
