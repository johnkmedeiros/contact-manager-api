import { ErrorCodes } from '@/application/constants/ErrorCodes';
import { BusinessException } from '@/application/exceptions/BusinessException';
import { Request, Response, NextFunction } from 'express';

export function ExceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof BusinessException) {
    res.status(err.statusCode).json({
      message: err.message,
      error_code: err.errorCode,
    });

    return;
  }

  const statusCode = (err as any).statusCode === 400 ? 400 : 500;
  const errorCode = statusCode === 400 ? ErrorCodes.BAD_REQUEST : ErrorCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    message: errorCode.message,
    error_code: errorCode.code,
  });
}
