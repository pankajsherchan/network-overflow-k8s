import { HTTPStatusCode } from '../enums/http-status.enum';
import { AppError } from './app-error';

export class UserExistsValidationError extends AppError {
  constructor() {
    super(
      'User Validation',
      'User Email Already Exists',
      HTTPStatusCode.Forbidden
    );
  }
}
