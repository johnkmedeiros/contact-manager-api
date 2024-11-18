import { LoginUserUseCase } from '@/application/use_cases/auth/LoginUserUseCase';
import { RegisterUserUseCase } from '@/application/use_cases/auth/RegisterUserUseCase';
import { UserRepositoryPrisma } from '@/infrastructure/repositories/auth/UserRepositoryPrisma';
import { PasswordHasherServiceBcrypt } from '@/infrastructure/services/auth/PasswordHasherServiceBcrypt';
import { AuthController } from '@/presentation/controllers/auth/AuthController';
import { LoginUserValidator } from '@/presentation/request_validators/LoginUserValidator';
import { RegisterUserValidator } from '@/presentation/request_validators/RegisterUserValidator';
import { Router } from 'express';
import { prismaClient } from '@/infrastructure/config/prisma';

const userRepository = new UserRepositoryPrisma(prismaClient);
const passwordHasherService = new PasswordHasherServiceBcrypt();
const registerUserUseCase = new RegisterUserUseCase(userRepository, passwordHasherService);
const loginUserUseCase = new LoginUserUseCase(userRepository, passwordHasherService);
const authController = new AuthController(registerUserUseCase, loginUserUseCase);

const router = Router();

router.post('/register', new RegisterUserValidator().validate, authController.register);

router.post('/login', new LoginUserValidator().validate, authController.login);

export default router;
