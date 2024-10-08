import { Injectable } from '@nestjs/common'

export type User = { userId: number; username: string; password: string }

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '123456',
    },
    {
      userId: 2,
      username: 'admin',
      password: '654321',
    },
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}
