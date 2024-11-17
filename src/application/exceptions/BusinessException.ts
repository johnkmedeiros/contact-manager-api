export class BusinessException extends Error {
    public errorCode: string;
    public statusCode: number;
  
    constructor(message: string, errorCode: string, statusCode: number) {
      super(message);
      this.name = this.constructor.name;
      this.message = message;
      this.errorCode = errorCode;
      this.statusCode = statusCode;
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  