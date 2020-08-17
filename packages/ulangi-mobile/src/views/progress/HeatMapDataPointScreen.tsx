import * as React from "react"
import * as moment from "moment"
import { View } from "react-native"
import { DefaultText } from "../common/DefaultText"
import { Screen } from '../common/Screen';
import { LightBoxContainerWithTitle } from '../light-box/LightBoxContainerWithTitle';
import{ observer } from "mobx-react"
import { DataPointScreenDelegate } from "../../delegates/progress/DataPointScreenDelegate";

import {
  ObservableLightBox,
  ObservableScreen,
  ObservableThemeStore,
} from '@ulangi/ulangi-observable';

export interface HeatMapDataPointScreenProps {
  themeStore: ObservableThemeStore;
  observableLightBox: ObservableLightBox;
  observableScreen: ObservableScreen;
  screenDelegate: DataPointScreenDelegate;
  date: Date
  value: number
}

@observer
export class HeatMapDataPointScreen extends React.Component<HeatMapDataPointScreenProps> {

  public render(): React.ReactElement<any> {
    return (
      <Screen
        useSafeAreaView={false}
        observableScreen={this.props.observableScreen}
        style={this.styles.screen}>
        <LightBoxContainerWithTitle
          theme={this.props.themeStore.theme}
          observableLightBox={this.props.observableLightBox}
          screenLayout={this.props.observableScreen.screenLayout}
          dismissLightBox={this.props.screenDelegate.dismissLightBox}
          title={moment(this.props.date).format("LL")}>
          <View>
            <DefaultText>Number of cards reviewed:</DefaultText>
              <DefaultText>{this.props.value}</DefaultText>
          </View>
        </LightBoxContainerWithTitle>
      </Screen>
    );
  }
}
