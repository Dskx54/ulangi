import { ScreenName } from '@ulangi/ulangi-common/enums';
import { boundClass } from 'autobind-decorator';

import { SecondaryScreenStyle } from '../../styles/SecondaryScreenStyle';
import { NavigatorDelegate } from '../navigator/NavigatorDelegate';
import { HeatMapDelegate } from './HeatMapDelegate';
import { StatisticsDelegate } from './StatisticsDelegate';

@boundClass
export class ProgressScreenDelegate {
  private statisticsDelegate: StatisticsDelegate;
  private heatMapDelegate: HeatMapDelegate;
  private navigatorDelegate: NavigatorDelegate;

  public constructor(
    statisticsDelegate: StatisticsDelegate,
    heatMapDelegate: HeatMapDelegate,
    navigatorDelegate: NavigatorDelegate,
  ) {
    this.statisticsDelegate = statisticsDelegate;
    this.heatMapDelegate = heatMapDelegate;
    this.navigatorDelegate = navigatorDelegate;
  }

  public getStatistics(): void {
    this.statisticsDelegate.getStatistics();
  }

  public getHeatMapData(): void {
    this.heatMapDelegate.getHeatMapData();
  }

  public showHeatMapDataPoint(date: Date, value: string | number): void {
    this.navigatorDelegate.showLightBox(
      ScreenName.HEAT_MAP_DATA_POINT_SCREEN,
      {
        date,
        value,
      },
      SecondaryScreenStyle.LIGHT_BOX_SCREEN_STYLES,
    );
  }
}
