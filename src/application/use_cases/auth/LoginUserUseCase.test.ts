// src/application/use_cases/auth/LoginUserUseCase.test.ts
import { LoginUserUseCase } from "@/application/use_cases/auth/LoginUserUseCase";
import { UserRepositoryInterface } from "@/domain/interfaces/repositories/auth/UserRepositoryInterface";
import { PasswordHasherServiceInterface } from "@/domain/interfaces/services/auth/PasswordHasherServiceInterface";
import { BusinessException } from "@/application/exceptions/BusinessException";
import { User } from "@/domain/entities/auth/User";

class MockUserRepository implements UserRepositoryInterface {
    private users = [
        {
            id: 1,
            name: "John Doe",
            email: "user@example.com",
            password: "hashed_password",
        },
    ];

    async findByEmail(email: string) {
        return this.users.find((user) => user.email === email) || null;
    }

    async create(user: User) {
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

describe("LoginUserUseCase", () => {
    let userRepository: UserRepositoryInterface;
    let passwordHasherService: PasswordHasherServiceInterface;
    let useCase: LoginUserUseCase;

    beforeEach(() => {
        userRepository = new MockUserRepository();
        passwordHasherService = new MockPasswordHasherService();
        useCase = new LoginUserUseCase(userRepository, passwordHasherService);
    });

    it("should throw an error if the user is not found", async () => {
        const dto = {
            email: "nonexistent@example.com",
            password: "any_password",
        };

        await expect(useCase.execute(dto)).rejects.toThrowError(
            new BusinessException(
                "INVALID_CREDENTIALS",
                "Invalid credentials",
                401,
            ),
        );
    });

    it("should throw an error if the password is incorrect", async () => {
        const dto = { email: "user@example.com", password: "wrong_password" };

        await expect(useCase.execute(dto)).rejects.toThrowError(
            new BusinessException(
                "INVALID_CREDENTIALS",
                "Invalid credentials",
                401,
            ),
        );
    });

    it("should return a token if the credentials are correct", async () => {
        const dto = { email: "user@example.com", password: "correct_password" };

        const response = await useCase.execute(dto);

        expect(response).toHaveProperty("token");
        expect(response).toHaveProperty("expiresIn");
    });
});
