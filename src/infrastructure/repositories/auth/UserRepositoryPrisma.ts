import { User } from "@/domain/entities/auth/User";
import { UserRepositoryInterface } from "@/domain/interfaces/repositories/auth/UserRepositoryInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepositoryPrisma implements UserRepositoryInterface {
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password,
    );
  }

  async findByEmail(email: string): Promise<User | null> {

    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    return user
      ? new User(user.id, user.name, user.email, user.password)
      : null;
  }
}
