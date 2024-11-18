import jwt from 'jsonwebtoken';
import { UserRepositoryInterface } from '@/domain/interfaces/repositories/auth/UserRepositoryInterface';
import { AuthTokenResponseDTO } from '@/application/dtos/auth/responses/AuthTokenResponseDTO';
import { LoginUserDTO } from '@/application/dtos/auth/LoginUserDTO';
import { config } from '@/infrastructure/config/config';
import { BusinessException } from '@/application/exceptions/BusinessException';
import { ErrorCodes } from '@/application/constants/ErrorCodes';
import { PasswordHasherServiceInterface } from '@/domain/interfaces/services/auth/PasswordHasherServiceInterface';

export class LoginUserUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private passwordHasherService: PasswordHasherServiceInterface,
  ) {}

  async execute(dto: LoginUserDTO): Promise<AuthTokenResponseDTO> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new BusinessException(
        ErrorCodes.INVALID_CREDENTIALS.code,
        ErrorCodes.INVALID_CREDENTIALS.message,
        401,
      );
    }

    const isValid = await this.passwordHasherService.comparePasswords(dto.password, user.password);

    if (!isValid) {
      throw new BusinessException(
        ErrorCodes.INVALID_CREDENTIALS.code,
        ErrorCodes.INVALID_CREDENTIALS.message,
        401,
      );
    }

    const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRATION_TIME,
    });

    return { token, expiresIn: config.JWT_EXPIRATION_TIME };
  }
}
