import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class inMemoryUsersRepository implements UsersRepository {
  public items: User[] = [] // make it public to be able to access it in tests later

  //find user by email
  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }
    return user
  }
  //create a mock user for testing
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }
    this.items.push(user)

    return user
  }
}
