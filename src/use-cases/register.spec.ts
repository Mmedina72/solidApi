import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { userAlreadyExistError } from './errors/user-already-exist'

//unit testing they are isolated from the rest of the application disconnected from the database and other external services

describe('Register UseCase ', () => {
  it('SHOULD BE ABLE TO REGISTER ', async () => {
    const usersRepository = new inMemoryUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('SHOULD HASH THE PASSWORD', async () => {
    const usersRepository = new inMemoryUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const isPasswordHashed = await compare('123456', user.password)

    expect(isPasswordHashed).toBe(true)
  })

  it('SHOULD NOT HAVE EMAIL REPEATED', async () => {
    const usersRepository = new inMemoryUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

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
      }),
    ).rejects.toBeInstanceOf(userAlreadyExistError)
  })
})
