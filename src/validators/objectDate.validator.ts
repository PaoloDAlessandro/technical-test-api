import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isExists } from 'date-fns';
import {
  AddInfoRequest as AddInfoRequestInterface,
  DateObject,
} from 'src/info/interfaces';

export function isValidObjectDate(validationOptions?: ValidationOptions) {
  return function (object: AddInfoRequestInterface, propertyName: string) {
    registerDecorator({
      name: 'isValidObjectDate',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: DateObject) {
          if (!value) return false;

          const { year, month, day } = value;

          return isExists(year, month - 1, day);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} contains an invalid date.`;
        },
      },
    });
  };
}
