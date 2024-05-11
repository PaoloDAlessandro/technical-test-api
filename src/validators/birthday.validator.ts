import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { AddInfoRequest as AddInfoRequestInterface } from 'src/info/interfaces';

export function IsBirthdayValid(validationOptions?: ValidationOptions) {
  return function (object: AddInfoRequestInterface, propertyName: string) {
    registerDecorator({
      name: 'isBirthdayValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { age } = args.object as { age: number };
          const currentDate = new Date();
          const birthday = new Date(value);
          const ageFromDate =
            currentDate.getFullYear() - birthday.getFullYear();
          birthday.setFullYear(currentDate.getFullYear());
          if (birthday > currentDate) {
            birthday.setFullYear(currentDate.getFullYear() - 1);
          }
          return ageFromDate === age;
        },
        defaultMessage(args: ValidationArguments) {
          const { age } = args.object as { age: number };
          return `The birthday does not correspond to the age of ${age}.`;
        },
      },
    });
  };
}
