import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsBirthdayValid } from 'src/validators/birthday.validator';
import { IsMarriedRequired } from 'src/validators/married.validator';
import {
  AddInfoRequest as AddInfoRequestInterface,
  UpdateInfoRequest as UpdateInfoRequestInterface,
} from '../interfaces';

export class UpdateInfoRequest implements UpdateInfoRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

export class AddInfoRequest implements AddInfoRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(150)
  age: number;

  @IsNotEmpty()
  @IsDateString()
  @IsBirthdayValid()
  birthday: string;

  @IsMarriedRequired()
  married: boolean;
}
