import { Theme } from '@ulangi/ulangi-common/enums';
import { ObservableScreenLayout } from '@ulangi/ulangi-observable';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import { View } from 'react-native';

import { config } from '../../constants/config';
import {
  HeatMapStyles,
  heatMapResponsiveStyles,
} from '../progress/HeatMap.style';

export interface HeatMapProps {
  range: [Date, Date];
  data: (number | null)[];
  theme: Theme;
  screenLayout: ObservableScreenLayout;
}

@observer
export class HeatMap extends React.Component<HeatMapProps> {
  private get styles(): HeatMapStyles {
    return heatMapResponsiveStyles.compile(
      this.props.screenLayout,
      this.props.theme,
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <View style={this.styles.container}>
        {this.props.data.map(
          (count, index): React.ReactElement<any> => {
            const option = config.heatMap.mapping.find(
              (opt): boolean => {
                if (count === null) {
                  return true;
                } else {
                  const [start, end] = opt.range;

                  return _.inRange(count, start, end + 1);
                }
              },
            );

            const styles = option
              ? option.styles
              : count !== null && count > config.heatMap.onFire.min
              ? config.heatMap.onFire.styles
              : config.heatMap.unavailable.styles;

            return <View key={index} style={[this.styles.item, styles]} />;
          },
        )}
      </View>
    );
  }
}
