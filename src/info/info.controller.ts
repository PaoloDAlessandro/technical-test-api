import { Controller, Post, Body } from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';
import { AddInfoRequest } from './models';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfo(bodyRequest);
  }

  @Post('/v2/validate')
  validateData(@Body() bodyRequest: AddInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfoV2(bodyRequest);
  }
}
