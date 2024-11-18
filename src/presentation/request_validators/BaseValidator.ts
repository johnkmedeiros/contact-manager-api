import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export class BaseValidator {
  protected schema: Joi.ObjectSchema;

  constructor(schema: Joi.ObjectSchema) {
    this.schema = schema;
  }

  validate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.schema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details });
      return;
    }

    next();
  };
}
