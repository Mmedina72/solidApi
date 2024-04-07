import { UsersRepository } from '@/repositories/users-repository'
import bcrypt from 'bcryptjs'
import { userAlreadyExistError } from './errors/user-already-exist'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new userAlreadyExistError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    })

    return { user }
  }
}
