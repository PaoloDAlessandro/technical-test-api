import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsBirthdayValid } from 'src/validators/birthday.validator';
import { IsMarriedRequired } from 'src/validators/married.validator';
import { isValidObjectDate } from 'src/validators/objectDate.validator';
import {
  AddInfoRequest as AddInfoRequestInterface,
  DateObject,
  UpdateInfoRequest as UpdateInfoRequestInterface,
} from '../interfaces';

export class UpdateInfoRequest implements UpdateInfoRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

export class AddInfoRequest implements AddInfoRequestInterface {
  @ApiProperty({ example: 'Mario', minLength: 5, maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 30, minimum: 5, maximum: 150 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(150)
  age: number;

  @ApiProperty({
    example: {
      day: 14,
      month: 4,
      year: 1994,
    },
  })
  @IsNotEmpty()
  @IsObject()
  @isValidObjectDate()
  @IsBirthdayValid()
  birthday: DateObject;

  @ApiProperty()
  @IsMarriedRequired()
  married: boolean;
}
