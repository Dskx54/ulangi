import {
  ObservableHeatMapScreen,
  ObservableThemeStore,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ScrollView } from 'react-native';

import { HeatMapScreenIds } from '../../constants/ids/HeatMapScreenIds';
import { Screen } from '../common/Screen';
import {
  HeatMapScreenStyles,
  heatMapScreenResponsiveStyles,
} from '../progress/HeatMapScreen.style';
import { HeatMapScreenDelegate } from "../../delegates/progress/HeatMapScreenDelegate"

export interface HeatMapScreenProps {
  themeStore: ObservableThemeStore;
  observableScreen: ObservableHeatMapScreen;
  screenDelegate: HeatMapScreenDelegate;
}

@observer
export class HeatMapScreen extends React.Component<HeatMapScreenProps> {
  private get styles(): HeatMapScreenStyles {
    return heatMapScreenResponsiveStyles.compile(
      this.props.observableScreen.screenLayout,
      this.props.themeStore.theme,
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <Screen
        testID={HeatMapScreenIds.SCREEN}
        observableScreen={this.props.observableScreen}
        useSafeAreaView={true}
        style={this.styles.screen}>
        <ScrollView />
      </Screen>
    );
  }
}
