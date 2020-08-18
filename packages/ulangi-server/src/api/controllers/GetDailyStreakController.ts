/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  GetDailyStreakRequest,
  GetDailyStreakResponse,
} from '@ulangi/ulangi-common/interfaces';

import { AuthenticationStrategy } from '../../enums/AuthenticationStrategy';
import { ControllerOptions } from '../../interfaces/ControllerOptions';
import { ApiRequest } from '../ApiRequest';
import { ApiResponse } from '../ApiResponse';
import { ApiController } from './ApiController';

export class GetDailyStreakController extends ApiController<
  GetDailyStreakRequest,
  GetDailyStreakResponse
> {
  public options(): ControllerOptions<GetDailyStreakRequest> {
    return {
      paths: ['/get-daily-streak'],
      allowedMethod: 'get',
      authStrategies: [AuthenticationStrategy.ACCESS_TOKEN],
      requestResolver: null,
    };
  }

  public async handleRequest(
    _: ApiRequest<GetDailyStreakRequest>,
    res: ApiResponse<GetDailyStreakResponse>
  ): Promise<void> {
    res.json({
      dailyStreak: 124,
    });
  }
}
