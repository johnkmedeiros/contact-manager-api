import { LoginUserDTO } from '@/application/dtos/auth/LoginUserDTO';
import { RegisterUserDTO } from '@/application/dtos/auth/RegisterUserDTO';
import { LoginUserUseCase } from '@/application/use_cases/auth/LoginUserUseCase';
import { RegisterUserUseCase } from '@/application/use_cases/auth/RegisterUserUseCase';
import { AuthTokenResource } from '@/presentation/resources/Auth/AuthTokenResource';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password }: RegisterUserDTO = req.body;

    const response = await this.registerUserUseCase.execute({
      name,
      email,
      password,
    });

    res.status(201).json(AuthTokenResource.format(response));
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password }: LoginUserDTO = req.body;

    const response = await this.loginUserUseCase.execute({
      email,
      password,
    });

    res.status(200).json(AuthTokenResource.format(response));
  };
}
