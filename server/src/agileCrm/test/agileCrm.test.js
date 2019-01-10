import { handleGetStarted } from '..'
import { createNoteForContact } from '../agileCrm'

// TODO: Change from integration test to unit test--will actually manipulate agileCRM
it.skip('creates a contact', async () => {
  const testEmail = 'foo@bar.com'
  try {
    const { task, contact } = await handleGetStarted({
      email: testEmail,
      firstName: 'first name',
      lastName: 'last name',
      title: 'Senior QA',
      company: 'my company',
      phone: '+1 403 837-4544'
    })

    console.log(`AgileCRM Contact=${JSON.stringify(contact, null, 2)}`)
    expect(contact).toBeDefined()
    expect(contact.id).toBeDefined()

    console.log(`AgileCRM Task=${JSON.stringify(task, null, 2)}`)
    expect(task).toBeDefined()
  } catch (err) {
    console.log(`Test Error: ${err}`)
    throw err
  }
})

it('Adds a note to a contact', async () => {
  const testEmail = 'darlene.dykstra@gmail.com'
  try {
    await createNoteForContact({
      email: testEmail,
      subject: 'Test Note',
      description: 'Test Description.  meow'
    })
  } catch (err) {
    console.log(`Test Error: ${err}`)
    throw err
  }
})
