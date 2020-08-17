import { boundClass } from 'autobind-decorator';

import { DailyStreakDelegate } from './DailyStreakDelegate';
import { HeatMapDelegate } from './HeatMapDelegate';

@boundClass
export class ProgressScreenDelegate {
  private dailyStreakDelegate: DailyStreakDelegate;
  private heatMapDelegate: HeatMapDelegate;

  public constructor(
    dailyStreakDelegate: DailyStreakDelegate,
    heatMapDelegate: HeatMapDelegate,
  ) {
    this.dailyStreakDelegate = dailyStreakDelegate;
    this.heatMapDelegate = heatMapDelegate;
  }

  public getDailyStreak(): void {
    this.dailyStreakDelegate.getDailyStreak();
  }

  public getHeatMapData(): void {
    this.heatMapDelegate.getHeatMapData();
  }
}
