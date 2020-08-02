import { Collection } from '../core/typings';
import { ValidationStatus, ValidationCode } from './typings';
import FieldValidation from './FieldValidation';

export default class ContainerValidation extends FieldValidation {
  fields: Collection<string>;
  constructor(message: string, status: ValidationStatus, code: ValidationCode, fields: Collection<string>) {
    super(message, status, code);
    this.fields = fields;
  }
}
