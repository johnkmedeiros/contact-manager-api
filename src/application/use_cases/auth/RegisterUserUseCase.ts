import jwt from 'jsonwebtoken';
import { RegisterUserDTO } from '@/application/dtos/auth/RegisterUserDTO';
import { User } from '@/domain/entities/auth/User';
import { UserRepositoryInterface } from '@/domain/interfaces/repositories/auth/UserRepositoryInterface';
import { AuthTokenResponseDTO } from '@/application/dtos/auth/responses/AuthTokenResponseDTO';
import { BusinessException } from '@/application/exceptions/BusinessException';
import { ErrorCodes } from '@/application/constants/ErrorCodes';
import { config } from '@/infrastructure/config/config';
import { PasswordHasherServiceInterface } from '@/domain/interfaces/services/auth/PasswordHasherServiceInterface';

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private passwordHasherService: PasswordHasherServiceInterface,
  ) {}

  async execute(dto: RegisterUserDTO): Promise<AuthTokenResponseDTO> {
    const userAlreadyExists = await this.userRepository.findByEmail(dto.email);

    if (userAlreadyExists) {
      throw new BusinessException(
        ErrorCodes.EMAIL_ALREADY_IN_USE.code,
        ErrorCodes.EMAIL_ALREADY_IN_USE.message,
        422,
      );
    }

    const { name, email, password } = dto;

    const hashedPassword = await this.passwordHasherService.hashPassword(password);
    const user = new User(0, name, email, hashedPassword);

    await this.userRepository.create(user);

    const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRATION_TIME,
    });

    return { token, expiresIn: config.JWT_EXPIRATION_TIME };
  }
}
