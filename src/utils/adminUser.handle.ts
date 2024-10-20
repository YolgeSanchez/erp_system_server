import UserRepository from '../modules/users/users.repository'
import { IUser } from '../modules/users/users.interfaces'
import { encrypt } from './bcrypt.handle'

const initAdminUser = async () => {
  try {
    const users = await UserRepository.getUsers()
    let adminExists = false
    if (users) {
      users.filter((user) => user.role === 'super').length > 0
        ? (adminExists = true)
        : (adminExists = false)
    }
    if (!adminExists) {
      console.log('No admin found, creating one...')

      const defaultAdmin: IUser = {
        name: 'super',
        email: 'super@super.com',
        password: await encrypt('super1234'), // Default password, make sure to encrypt it
        role: 'super',
      }

      await UserRepository.insertUser(defaultAdmin)
      console.log('Admin user created successfully.')
    }
    console.log('Admin user already exists.')
  } catch (error) {
    console.error('Error initializing admin user:', error)
    throw new Error('Error initializing admin user')
  }
}

export default initAdminUser
