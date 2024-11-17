import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const RegisterUserValidator = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(400).json({ error: error.details });
    }

    next();
};
