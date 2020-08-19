/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  GetHeatMapDataRequest,
  GetHeatMapDataResponse,
} from '@ulangi/ulangi-common/interfaces';
import { GetHeatMapDataRequestResolver } from '@ulangi/ulangi-common/resolvers';

import { AuthenticationStrategy } from '../../enums/AuthenticationStrategy';
import { ControllerOptions } from '../../interfaces/ControllerOptions';
import { ApiRequest } from '../ApiRequest';
import { ApiResponse } from '../ApiResponse';
import { ApiController } from './ApiController';

export class GetHeatMapDataController extends ApiController<
  GetHeatMapDataRequest,
  GetHeatMapDataResponse
> {
  public options(): ControllerOptions<GetHeatMapDataRequest> {
    return {
      paths: ['/get-heat-map-data'],
      allowedMethod: 'get',
      authStrategies: [AuthenticationStrategy.ACCESS_TOKEN],
      requestResolver: new GetHeatMapDataRequestResolver(),
    };
  }

  public async handleRequest(
    _: ApiRequest<GetHeatMapDataRequest>,
    res: ApiResponse<GetHeatMapDataResponse>
  ): Promise<void> {
    //const { startDate, endDate } = req.query

    res.json({
      data: [0, 1, 22, 33, 34, 0, 12, 0, 21, 29, 20, 3, 53, 34, 0, 40, 23, 2, 85, 2, 84, 5, 1, 4, 0 ,5, 20, 30 ],
    });
  }
}
