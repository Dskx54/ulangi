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

export interface CategoryItemStyles {
  item_container: ViewStyle;
  top_container: ViewStyle;
  bottom_container: ViewStyle;
  stats_container: ViewStyle;
  stats_label_container: ViewStyle;
  stats_label: TextStyle;
  category_name: TextStyle;
  category_meta: TextStyle;
  left: ViewStyle;
  right: ViewStyle;
  right_item: ViewStyle;
  first_right_item: ViewStyle;
  action_btn: ViewStyle;
  count: TextStyle;
  terms: TextStyle;
  review_btn_container: ViewStyle;
}

export class CategoryItemResponsiveStyles extends ResponsiveStyleSheet<
  CategoryItemStyles
> {
  public baseStyles(
    scaleByFactor: ScaleByFactor,
    scaleByBreakpoints: ScaleByBreakpoints,
  ): CategoryItemStyles {
    return {
      item_container: {
        marginHorizontal: scaleByBreakpoints(
          defaultHorizontalMarginByBreakpoints,
        ),
        marginBottom: scaleByFactor(16),
        borderRadius: scaleByFactor(5),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0.3 },
        shadowRadius: 0.75,
        shadowOpacity: 0.2,
      },

      top_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleByFactor(14),
        paddingVertical: scaleByFactor(14),
      },

      bottom_container: {},

      stats_container: {
        paddingHorizontal: scaleByFactor(14),
        paddingVertical: scaleByFactor(14),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
      },

      stats_label_container: {
        width: scaleByFactor(30),
      },

      stats_label: {
        paddingRight: scaleByFactor(4),
        fontWeight: 'bold',
        fontSize: scaleByFactor(13),
      },

      category_name: {
        fontWeight: 'bold',
        fontSize: scaleByFactor(17),
        paddingBottom: scaleByFactor(4),
      },

      category_meta: {
        fontSize: scaleByFactor(12),
      },

      left: {
        paddingRight: scaleByFactor(12),
        flexShrink: 1,
      },

      right: {
        flexDirection: 'row',
        paddingLeft: scaleByFactor(12),
        alignItems: 'center',
        justifyContent: 'center',
      },

      right_item: {
        paddingLeft: scaleByFactor(14),
      },

      first_right_item: {
        paddingLeft: scaleByFactor(0),
      },

      action_btn: {},

      count: {
        fontWeight: 'bold',
        fontSize: scaleByFactor(18),
        paddingBottom: scaleByFactor(3),
      },

      terms: {
        fontSize: scaleByFactor(12),
      },

      review_btn_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scaleByFactor(12),
      },
    };
  }

  public lightStyles(): Partial<CategoryItemStyles> {
    return {
      item_container: {
        backgroundColor: config.styles.light.primaryBackgroundColor,
        elevation: 1,
      },

      bottom_container: {},

      stats_container: {
        borderTopColor: config.styles.light.secondaryBorderColor,
      },

      stats_label: {
        color: config.styles.light.secondaryTextColor,
      },

      category_name: {
        color: config.styles.light.primaryTextColor,
      },

      category_meta: {
        color: config.styles.light.secondaryTextColor,
      },

      count: {
        color: config.styles.light.primaryTextColor,
      },

      terms: {
        color: config.styles.light.secondaryTextColor,
      },
    };
  }

  public darkStyles(): Partial<CategoryItemStyles> {
    return {
      item_container: {
        backgroundColor: config.styles.dark.primaryBackgroundColor,
        elevation: 3,
      },

      bottom_container: {},

      stats_container: {
        borderTopColor: config.styles.dark.secondaryBorderColor,
      },

      stats_label: {
        color: config.styles.dark.secondaryTextColor,
      },

      category_name: {
        color: config.styles.dark.primaryTextColor,
      },

      category_meta: {
        color: config.styles.dark.secondaryTextColor,
      },

      count: {
        color: config.styles.dark.primaryTextColor,
      },

      terms: {
        color: config.styles.dark.secondaryTextColor,
      },
    };
  }
}

export const categoryItemResponsiveStyles = new CategoryItemResponsiveStyles();
