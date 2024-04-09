import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}
export class Authenticate {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateUseCaseResponse> {
    // 1. Check if the user exists wyith the given email
    // 2. Check if the password is correct

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
