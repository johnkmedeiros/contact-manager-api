import { User } from '@/domain/entities/auth/User';

export interface UserRepositoryInterface {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
