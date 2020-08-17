/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ViewStyle } from 'react-native';

import { ResponsiveStyleSheet, ScaleByFactor } from '../../utils/responsive';

export interface HeatMapStyles {
  container: ViewStyle;
  item: ViewStyle;
}

export interface HeatMapOptions {
  numOfColumns: number;
}

export class HeatMapResponsiveStyles extends ResponsiveStyleSheet<
  HeatMapStyles,
  HeatMapOptions
> {
  public baseStyles(scaleByFactor: ScaleByFactor): HeatMapStyles {
    return {
      container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      item: {
        height: scaleByFactor(24),
        width: scaleByFactor(24),
        borderRadius: scaleByFactor(3),
        margin: scaleByFactor(2),
      },
    };
  }

  public lightStyles(): Partial<HeatMapStyles> {
    return {};
  }

  public darkStyles(): Partial<HeatMapStyles> {
    return {};
  }
}

export const heatMapResponsiveStyles = new HeatMapResponsiveStyles();
