import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { AddInfoRequest as AddInfoRequestInterface } from 'src/info/interfaces';

export function IsMarriedRequired(validationOptions?: ValidationOptions) {
  return function (object: AddInfoRequestInterface, propertyName: string) {
    registerDecorator({
      name: 'isMarriedRequired',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { age } = args.object as AddInfoRequestInterface;
          if (age >= 18) return value !== null;

          return true;
        },
        defaultMessage() {
          return `Marital status needs to be specified for adults`;
        },
      },
    });
  };
}
