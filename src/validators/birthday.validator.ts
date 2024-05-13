import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { addYears } from 'date-fns';
import { AddInfoRequest as AddInfoRequestInterface } from 'src/info/interfaces';

export function IsBirthdayValid(validationOptions?: ValidationOptions) {
  return function (object: AddInfoRequestInterface, propertyName: string) {
    registerDecorator({
      name: 'isBirthdayValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const { age } = args.object as { age: number };

          const today = new Date();
          const birthday = new Date(value);

          const lowerBound = addYears(birthday, age);
          const upperBound = addYears(lowerBound, 1);

          return lowerBound <= today && today < upperBound;
        },
        defaultMessage(args: ValidationArguments) {
          const { age } = args.object as { age: number };
          return `The birthday does not correspond to the age of ${age}.`;
        },
      },
    });
  };
}
