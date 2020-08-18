import { ScreenName } from '@ulangi/ulangi-common/enums';
import { boundClass } from 'autobind-decorator';

import { SecondaryScreenStyle } from '../../styles/SecondaryScreenStyle';
import { NavigatorDelegate } from '../navigator/NavigatorDelegate';
import { DailyStreakDelegate } from './DailyStreakDelegate';
import { HeatMapDelegate } from './HeatMapDelegate';

@boundClass
export class ProgressScreenDelegate {
  private dailyStreakDelegate: DailyStreakDelegate;
  private heatMapDelegate: HeatMapDelegate;
  private navigatorDelegate: NavigatorDelegate;

  public constructor(
    dailyStreakDelegate: DailyStreakDelegate,
    heatMapDelegate: HeatMapDelegate,
    navigatorDelegate: NavigatorDelegate,
  ) {
    this.dailyStreakDelegate = dailyStreakDelegate;
    this.heatMapDelegate = heatMapDelegate;
    this.navigatorDelegate = navigatorDelegate;
  }

  public getDailyStreak(): void {
    this.dailyStreakDelegate.getDailyStreak();
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
