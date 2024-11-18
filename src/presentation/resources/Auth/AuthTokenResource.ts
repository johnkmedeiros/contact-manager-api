import { AuthTokenResponseDTO } from '@/application/dtos/auth/responses/AuthTokenResponseDTO';

export interface AuthTokenFormattedResponse {
  token: string;
  expires_in: string;
}

export class AuthTokenResource {
  static format(dto: AuthTokenResponseDTO): AuthTokenFormattedResponse {
    return {
      token: dto.token,
      expires_in: dto.expiresIn,
    };
  }
}
