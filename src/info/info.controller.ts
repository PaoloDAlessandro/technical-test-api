import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BaseResponse } from '../interfaces';
import { InfoService } from './info.service';
import { UpdateInfoRequest } from './interfaces';
import { AddInfoRequest } from './models';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfo(bodyRequest);
  }

  @ApiOperation({
    summary: 'info validations',
    description:
      'This endpoint validate user info and return validation status.',
  })
  @Post('/v2/validate')
  validateData(@Body() bodyRequest: AddInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfoV2(bodyRequest);
  }
}
