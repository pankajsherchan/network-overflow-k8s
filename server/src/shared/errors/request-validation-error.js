import { HTTPStatusCode } from '../enums/http-status.enum';
import { AppError } from './app-error';

export class RequestValidationError extends AppError {
  constructor(requestedEntity, errorMessage) {
    super(
      `${requestedEntity} Validation Failed`,
      errorMessage,
      HTTPStatusCode.UnprocessableEntity
    );
  }
}
