import { createContact } from '../agileCrm'

it('creates a contact', async () => {
  const result = await createContact({ email: 'foo@bar.com' })
  expect(result.type).toBe('string')
})
