import { AnonymousObject } from '../core/typings';
import { ValidationStatus, ValidationCode } from './typings';
import FieldValidation from './FieldValidation';

export default class ContainerValidation extends FieldValidation {
  fields: AnonymousObject<string>;
  constructor(message: string, status: ValidationStatus, code: ValidationCode, fields: AnonymousObject<string>) {
    super(message, status, code);
    this.fields = fields;
  }
}
