import Joi from 'joi';
import { BaseValidator } from '@/presentation/request_validators/BaseValidator';

export class RegisterUserValidator extends BaseValidator {
  constructor() {
    super(
      Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    );
  }
}
