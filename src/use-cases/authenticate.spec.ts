import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { Authenticate } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

let usersRepository: inMemoryUsersRepository
let authenticateUseCase: Authenticate

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    authenticateUseCase = new Authenticate(usersRepository)
  })

  it('should authenticate user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 8),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not authenticate user with invalid password', async () => {
    expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not authenticate user with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 8),
    })

    expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '1234567',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
