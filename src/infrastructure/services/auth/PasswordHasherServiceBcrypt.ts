import { PasswordHasherServiceInterface } from '@/domain/interfaces/services/auth/PasswordHasherServiceInterface';
import bcrypt from 'bcryptjs';

export class PasswordHasherServiceBcrypt implements PasswordHasherServiceInterface {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
