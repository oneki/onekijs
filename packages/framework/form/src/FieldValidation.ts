import { ValidationStatus, ValidationCode } from './typings';

export default class FieldValidation {
  message: string;
  status: ValidationStatus;
  code: ValidationCode;

  constructor(message: string, status: ValidationStatus, code: ValidationCode) {
    this.message = message;
    this.status = status;
    this.code = code;
  }

  isLoading(): boolean {
    return this.code === ValidationCode.Loading;
  }

  isNotLoading(): boolean {
    return this.code !== ValidationCode.Loading;
  }

  isError(): boolean {
    return this.code === ValidationCode.Error;
  }

  isWarning(): boolean {
    return this.code === ValidationCode.Warning;
  }

  isOK(): boolean {
    return this.code === ValidationCode.Ok;
  }

  isNotOK(): boolean {
    return this.code < ValidationCode.Ok;
  }

  isValidated(): boolean {
    return this.code === ValidationCode.None;
  }

  isNotValidated(): boolean {
    return this.code !== ValidationCode.None;
  }

  equals(otherValidation?: FieldValidation): boolean {
    if (!otherValidation) {
      return false;
    }
    return (
      otherValidation.message === this.message &&
      otherValidation.status === this.status &&
      otherValidation.code === this.code
    );
  }
}

export const defaultValidation = new FieldValidation('', ValidationStatus.None, ValidationCode.None);
