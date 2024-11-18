import Joi from 'joi';
import { BaseValidator } from '@/presentation/request_validators/BaseValidator';

export class LoginUserValidator extends BaseValidator {
  constructor() {
    super(
      Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    );
  }
}
