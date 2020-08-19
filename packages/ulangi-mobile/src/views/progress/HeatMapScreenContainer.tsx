import * as React from "react"
import { observer } from "mobx-react"
import { HeatMapScreen } from "./HeatMapScreen"
import { Container, ContainerPassedProps } from "../../Container"
import { Options } from "@ulangi/react-native-navigation"
import { Theme, ScreenName, ActivityState } from "@ulangi/ulangi-common/enums"
import { ObservableHeatMapScreen, ObservableHeatMapState, ObservableTitleTopBar } from "@ulangi/ulangi-observable"
import { HeatMapScreenStyle } from "./HeatMapScreenContainer.style"
import { HeatMapScreenFactory } from "../../factories/progress/HeatMapScreenFactory"

@observer
export class HeatMapScreenContainer extends Container {
  public static options(props: ContainerPassedProps): Options {
    return props.theme === Theme.LIGHT
      ? HeatMapScreenStyle.SCREEN_FULL_LIGHT_STYLES
      : HeatMapScreenStyle.SCREEN_FULL_DARK_STYLES;
  }

  private screenFactory = new HeatMapScreenFactory(
    this.props,
    this.eventBus,
    this.observer,
  );

  private dateRangeDelegate = this.screenFactory.createDateRangeDelegate();

  protected observableScreen = new ObservableHeatMapScreen(
    new ObservableHeatMapState(
      this.dateRangeDelegate.createRangeByNumberOfDays(30),
      null,
      ActivityState.INACTIVE,
    ),
    this.props.componentId,
    ScreenName.HEAT_MAP_SCREEN,
    new ObservableTitleTopBar('HeatMap', null, null),
  );

  private navigatorDelegate = this.screenFactory.createNavigatorDelegate();

  private screenDelegate = this.screenFactory.createScreenDelegate(
    this.observableScreen,
  );

  protected onThemeChanged(theme: Theme): void {
    this.navigatorDelegate.mergeOptions(
      theme === Theme.LIGHT
        ? HeatMapScreenStyle.SCREEN_LIGHT_STYLES_ONLY
        : HeatMapScreenStyle.SCREEN_DARK_STYLES_ONLY,
    );
  }

  public componentDidMount(): void {
    this.screenDelegate.getHeatMapData();
  }

  public render(): React.ReactElement<any> {
    return (
      <HeatMapScreen
        themeStore={this.props.rootStore.themeStore}
        observableScreen={this.observableScreen}
        screenDelegate={this.screenDelegate}
      />
    );
  }
}
