/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ViewStyle } from 'react-native';

import {
  ResponsiveStyleSheet,
  ScaleByBreakpoints,
  ScaleByFactor,
  defaultHorizontalMarginByBreakpoints,
} from '../../utils/responsive';

export interface HeatMapScreenStyles {
  screen: ViewStyle;
  container: ViewStyle;
}

export class HeatMapScreenResponsiveStyles extends ResponsiveStyleSheet<
  HeatMapScreenStyles
> {
  public baseStyles(
    scaleByFactor: ScaleByFactor,
    scaleByBreakpoints: ScaleByBreakpoints,
  ): HeatMapScreenStyles {
    return {
      screen: {
        flex: 1,
      },

      container: {
        marginHorizontal: scaleByBreakpoints(
          defaultHorizontalMarginByBreakpoints,
        ),
        marginTop: scaleByFactor(10),
      },
    };
  }

  public lightStyles(): Partial<HeatMapScreenStyles> {
    return {};
  }

  public darkStyles(): Partial<HeatMapScreenStyles> {
    return {};
  }
}

export const heatMapScreenResponsiveStyles = new HeatMapScreenResponsiveStyles();
