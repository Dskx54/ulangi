import { ActivityState } from '@ulangi/ulangi-common/enums';
import {
  ObservableProgressScreen,
  ObservableThemeStore,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { ProgressScreenIds } from '../../constants/ids/ProgressScreenIds';
import { ProgressScreenDelegate } from '../../delegates/progress/ProgresScreenDelegate';
import { DefaultText } from '../common/DefaultText';
import { Screen } from '../common/Screen';
import {
  ProgressScreenStyles,
  progressScreenResponsiveStyles,
} from '../progress/ProgressScreen.style';
import { HeatMap } from './HeatMap';

export interface ProgressScreenProps {
  themeStore: ObservableThemeStore;
  observableScreen: ObservableProgressScreen;
  screenDelegate: ProgressScreenDelegate;
}

@observer
export class ProgressScreen extends React.Component<ProgressScreenProps> {
  private get styles(): ProgressScreenStyles {
    return progressScreenResponsiveStyles.compile(
      this.props.observableScreen.screenLayout,
      this.props.themeStore.theme,
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <Screen
        testID={ProgressScreenIds.SCREEN}
        observableScreen={this.props.observableScreen}
        useSafeAreaView={true}
        style={this.styles.screen}>
        <ScrollView>
          {this.renderDailyStreak()}
          {this.renderHeatMap()}
        </ScrollView>
      </Screen>
    );
  }

  private renderDailyStreak(): React.ReactElement<any> {
    return (
      <View style={this.styles.streak_container}>
        <DefaultText style={this.styles.title}>DAILY STREAK</DefaultText>
        {this.props.observableScreen.dailyStreakState.fetchState ===
        ActivityState.ERROR ? (
          <DefaultText style={this.styles.error_message}>
            <DefaultText>
              Error: Cannot fetch daily streak. Please check internet connection
              and{' '}
            </DefaultText>
            <DefaultText
              onPress={this.props.screenDelegate.getDailyStreak}
              style={this.styles.highlighted}>
              try again.
            </DefaultText>
          </DefaultText>
        ) : this.props.observableScreen.dailyStreakState.dailyStreak !==
          null ? (
          <React.Fragment>
            <DefaultText style={this.styles.streak_count}>
              {this.props.observableScreen.dailyStreakState.dailyStreak}
            </DefaultText>
            <DefaultText style={this.styles.view_streak_button}>
              View streak history
            </DefaultText>
          </React.Fragment>
        ) : (
          <ActivityIndicator style={this.styles.spinner} size="small" />
        )}
      </View>
    );
  }

  private renderHeatMap(): React.ReactElement<any> {
    return (
      <View style={this.styles.heat_map_container}>
        <DefaultText style={this.styles.title}>HEAT MAP</DefaultText>
        <DefaultText style={this.styles.subtitle}>
          Last {this.props.observableScreen.heatMapState.numberOfDays} days
        </DefaultText>
        {this.props.observableScreen.heatMapState.fetchState ===
        ActivityState.ERROR ? (
          <DefaultText style={this.styles.error_message}>
            <DefaultText>
              Error: Cannot fetch heat map data. Please check internet
              connection and{' '}
            </DefaultText>
            <DefaultText
              onPress={this.props.screenDelegate.getHeatMapData}
              style={this.styles.highlighted}>
              try again.
            </DefaultText>
          </DefaultText>
        ) : this.props.observableScreen.heatMapState.data !== null ? (
          <React.Fragment>
            <View style={this.styles.heat_map}>
              <HeatMap
                range={this.props.observableScreen.heatMapState.range}
                data={this.props.observableScreen.heatMapState.data}
                theme={this.props.themeStore.theme}
                screenLayout={this.props.observableScreen.screenLayout}
              />
            </View>
            <DefaultText style={this.styles.note}>
              * Heat map shows the number of cards you review daily.
            </DefaultText>
            <DefaultText style={this.styles.view_heat_map_button}>
              View full heat map
            </DefaultText>
          </React.Fragment>
        ) : (
          <ActivityIndicator style={this.styles.spinner} size="small" />
        )}
      </View>
    );
  }
}
