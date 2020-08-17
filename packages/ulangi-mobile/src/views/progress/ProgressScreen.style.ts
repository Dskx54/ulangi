/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { config } from '../../constants/config';
import {
  ResponsiveStyleSheet,
  ScaleByBreakpoints,
  ScaleByFactor,
  defaultHorizontalMarginByBreakpoints,
} from '../../utils/responsive';

export interface ProgressScreenStyles {
  screen: ViewStyle;
  streak_container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  streak_count: TextStyle;
  view_streak_button: TextStyle;
  view_heat_map_button: TextStyle;
  note: TextStyle;
  heat_map_container: ViewStyle;
  heat_map: ViewStyle;
  spinner: ViewStyle;
  error_message: TextStyle;
  highlighted: TextStyle;
}

export class ProgressScreenResponsiveStyles extends ResponsiveStyleSheet<
  ProgressScreenStyles
> {
  public baseStyles(
    scaleByFactor: ScaleByFactor,
    scaleByBreakpoints: ScaleByBreakpoints,
  ): ProgressScreenStyles {
    return {
      screen: {
        flex: 1,
      },

      streak_container: {
        marginHorizontal: scaleByBreakpoints(
          defaultHorizontalMarginByBreakpoints,
        ),
        marginTop: scaleByFactor(20),
      },

      title: {
        fontSize: scaleByFactor(14),
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: -0.5,
      },

      subtitle: {
        fontSize: scaleByFactor(14),
        textAlign: 'center',
      },

      streak_count: {
        fontSize: scaleByFactor(32),
        textAlign: 'center',
        fontWeight: 'bold',
        paddingVertical: scaleByFactor(10),
      },

      view_streak_button: {
        color: config.styles.primaryColor,
        textAlign: 'center'
      },

      view_heat_map_button: {
        paddingTop: scaleByFactor(8),
        color: config.styles.primaryColor,
        textAlign: 'center',
      },

      note: {
        fontSize: scaleByFactor(14),
      },

      heat_map_container: {
        marginTop: scaleByFactor(20),
        paddingTop: scaleByFactor(16),
        borderTopWidth: StyleSheet.hairlineWidth,
        marginHorizontal: scaleByBreakpoints(
          defaultHorizontalMarginByBreakpoints,
        ),
      },

      heat_map: {
        paddingVertical: scaleByFactor(14),
      },

      spinner: {
        paddingVertical: scaleByFactor(16),
      },

      error_message: {
        paddingVertical: scaleByFactor(16),
        fontSize: scaleByFactor(14),
        textAlign: 'center',
      },

      highlighted: {
        color: config.styles.primaryColor,
      },
    };
  }

  public lightStyles(): Partial<ProgressScreenStyles> {
    return {
      title: {
        color: config.styles.light.secondaryTextColor,
      },

      subtitle: {
        color: config.styles.light.secondaryTextColor,
      },

      streak_count: {
        color: config.styles.light.primaryTextColor,
      },

      note: {
        color: config.styles.light.secondaryTextColor,
      },

      heat_map_container: {
        borderTopColor: config.styles.light.primaryBorderColor,
      },

      error_message: {
        color: config.styles.light.secondaryTextColor,
      },
    };
  }

  public darkStyles(): Partial<ProgressScreenStyles> {
    return {
      screen: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#131313',
      },

      title: {
        color: config.styles.dark.secondaryTextColor,
      },

      subtitle: {
        color: config.styles.dark.secondaryTextColor,
      },

      streak_count: {
        color: config.styles.dark.primaryTextColor,
      },

      note: {
        color: config.styles.dark.secondaryTextColor,
      },

      heat_map_container: {
        borderTopColor: config.styles.dark.primaryBorderColor,
      },

      error_message: {
        color: config.styles.dark.secondaryTextColor,
      },
    };
  }
}

export const progressScreenResponsiveStyles = new ProgressScreenResponsiveStyles();
