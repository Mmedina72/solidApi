import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import bcrypt from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { userAlreadyExistError } from './errors/user-already-exist'

//unit testing they are isolated from the rest of the application disconnected from the database and other external services
//initializing the variables
let usersRepository: inMemoryUsersRepository
let registerUseCase: RegisterUseCase

//unit testing they are isolated from the rest of the application disconnected from the database and other external services
describe('Register UseCase ', () => {
  beforeEach(() => {
    //creating a new instance of the inMemoryUsersRepository to be used in all tests
    usersRepository = new inMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('SHOULD BE ABLE TO REGISTER ', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('SHOULD HASH THE PASSWORD', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const isPasswordHashed = await bcrypt.compare('123456', user.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('SHOULD NOT HAVE EMAIL REPEATED', async () => {
    const email = 'johndoe@gmail.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email: email,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(userAlreadyExistError)
  })
})
