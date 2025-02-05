import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateInfoRequest as UpdateInfoRequestInterface } from './interfaces';
import { AddInfoRequest as AddInfoRequestInterface } from './interfaces';
import { BaseResponse } from '../interfaces';
import { AddInfoRequest, UpdateInfoRequest } from './models';

@Injectable()
export class InfoService {
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateInfoRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data,
    };
  }

  async validateInfoV2(
    rawData: AddInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(AddInfoRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      throw new BadRequestException({
        success: false,
        errors: validationErrors,
      });
    }
    return {
      success: true,
      data,
    };
  }
}
