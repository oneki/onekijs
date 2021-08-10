import { ValidationStatus } from '../types/form';
import { AnonymousObject } from '../types/object';
import FieldValidation from './FieldValidation';
import { ValidationCode } from './typings';

export default class ContainerValidation extends FieldValidation {
  fields: AnonymousObject<string>;
  constructor(message: string, status: ValidationStatus, code: ValidationCode, fields: AnonymousObject<string>) {
    super(message, status, code);
    this.fields = fields;
  }
}
