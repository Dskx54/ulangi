/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  GetStatisticsRequest,
  GetStatisticsResponse,
} from '@ulangi/ulangi-common/interfaces';

import { AuthenticationStrategy } from '../../enums/AuthenticationStrategy';
import { ControllerOptions } from '../../interfaces/ControllerOptions';
import { ApiRequest } from '../ApiRequest';
import { ApiResponse } from '../ApiResponse';
import { ApiController } from './ApiController';

export class GetStatisticsController extends ApiController<
  GetStatisticsRequest,
  GetStatisticsResponse
> {
  public options(): ControllerOptions<GetStatisticsRequest> {
    return {
      paths: ['/get-statistics'],
      allowedMethod: 'get',
      authStrategies: [AuthenticationStrategy.ACCESS_TOKEN],
      requestResolver: null,
    };
  }

  public async handleRequest(
    _: ApiRequest<GetStatisticsRequest>,
    res: ApiResponse<GetStatisticsResponse>
  ): Promise<void> {
    res.json({
      statistics: {
        dailyStreak: 124,
        totalReviews: 363,
        averageReviewsPerDay: 25,
      }
    });
  }
}
