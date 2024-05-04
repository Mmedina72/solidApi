import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { Authenticate } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new Authenticate(usersRepository)
  return authenticateUseCase
}
