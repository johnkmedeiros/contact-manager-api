// src/application/use_cases/auth/RegisterUserUseCase.test.ts
import { RegisterUserUseCase } from "@/application/use_cases/auth/RegisterUserUseCase";
import { UserRepositoryInterface } from "@/domain/interfaces/repositories/auth/UserRepositoryInterface";
import { PasswordHasherServiceInterface } from "@/domain/interfaces/services/auth/PasswordHasherServiceInterface";
import { BusinessException } from "@/application/exceptions/BusinessException";
import { User } from "@/domain/entities/auth/User";
import { AuthTokenResponseDTO } from "@/application/dtos/auth/responses/AuthTokenResponseDTO";
import { ErrorCodes } from "@/application/constants/ErrorCodes";

class MockUserRepository implements UserRepositoryInterface {
    private users = [
        {
            id: 1,
            name: "John Doe",
            email: "user@example.com",
            password: "hashed_password",
        },
    ];

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find((user) => user.email === email) || null;
    }

    async create(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }
}

class MockPasswordHasherService implements PasswordHasherServiceInterface {
    async hashPassword(password: string): Promise<string> {
        return "hashed_password";
    }

    async comparePasswords(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return (
            plainPassword === "correct_password" &&
            hashedPassword === "hashed_password"
        );
    }
}

describe("RegisterUserUseCase", () => {
    let userRepository: UserRepositoryInterface;
    let passwordHasherService: PasswordHasherServiceInterface;
    let useCase: RegisterUserUseCase;

    beforeEach(() => {
        userRepository = new MockUserRepository();
        passwordHasherService = new MockPasswordHasherService();
        useCase = new RegisterUserUseCase(
            userRepository,
            passwordHasherService,
        );
    });

    it("should throw an error if the email is already in use", async () => {
        const dto = {
            name: "Jane Doe",
            email: "user@example.com",
            password: "new_password",
        };

        await expect(useCase.execute(dto)).rejects.toThrowError(
            new BusinessException(
                ErrorCodes.EMAIL_ALREADY_IN_USE.code,
                ErrorCodes.EMAIL_ALREADY_IN_USE.message,
                401,
            ),
        );
    });

    it("should successfully register a new user and return a token", async () => {
        const dto = {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            password: "new_password",
        };

        const createSpy = jest.spyOn(userRepository, "create");

        const response: AuthTokenResponseDTO = await useCase.execute(dto);

        expect(response).toHaveProperty("token");
        expect(response).toHaveProperty("expiresIn");

        expect(createSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                name: dto.name,
                email: dto.email,
                password: expect.any(String),
            }),
        );
    });
});
