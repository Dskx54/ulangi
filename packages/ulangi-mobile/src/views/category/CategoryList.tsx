/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ReadonlyTuple } from '@ulangi/extended-types';
import { Theme, VocabularyFilterType } from '@ulangi/ulangi-common/enums';
import {
  ObservableCategory,
  ObservableCategoryListState,
  ObservableScreenLayout,
} from '@ulangi/ulangi-observable';
import { IObservableValue } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { FlatList, View } from 'react-native';

import { CategoryItem } from '../category/CategoryItem';
import { DefaultActivityIndicator } from '../common/DefaultActivityIndicator';
import {
  CategoryListStyles,
  categoryListResponsiveStyles,
} from './CategoryList.style';

export interface CategoryListProps {
  testID: string;
  theme: Theme;
  screenLayout: ObservableScreenLayout;
  categoryListState: ObservableCategoryListState;
  selectedFilterType: IObservableValue<VocabularyFilterType>;
  toggleSelection: (categoryName: string) => void;
  showCategoryDetail: (category: ObservableCategory) => void;
  showCategoryActionMenu: (
    category: ObservableCategory,
    filterType: VocabularyFilterType,
  ) => void;
  goToSpacedRepetition: (selectedCategoryNames: string[]) => void;
  goToWriting: (selectedCategoryNames: string[]) => void;
  showLevelBreakdownForSR: (category: ObservableCategory) => void;
  showLevelBreakdownForWR: (category: ObservableCategory) => void;
  shouldShowLevelProgressForSR: boolean;
  shouldShowLevelProgressForWR: boolean;
  refresh: () => void;
  fetchNext: () => void;
}

@observer
export class CategoryList extends React.Component<CategoryListProps> {
  private keyExtractor = (item: any): string => item[0];

  private get styles(): CategoryListStyles {
    return categoryListResponsiveStyles.compile(
      this.props.screenLayout,
      this.props.theme,
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <View style={this.styles.list_container}>
        <FlatList
          testID={this.props.testID}
          contentContainerStyle={this.styles.list}
          data={
            this.props.categoryListState.categoryList
              ? Array.from(this.props.categoryListState.categoryList)
              : []
          }
          renderItem={({
            item,
          }: {
            item: ReadonlyTuple<string, ObservableCategory>;
          }): React.ReactElement<any> => {
            const [, category] = item;
            return (
              <CategoryItem
                theme={this.props.theme}
                screenLayout={this.props.screenLayout}
                category={category}
                selectedFilterType={this.props.selectedFilterType}
                isSelectionModeOn={
                  this.props.categoryListState.isSelectionModeOn
                }
                toggleSelection={this.props.toggleSelection}
                showCategoryDetail={this.props.showCategoryDetail}
                showCategoryActionMenu={this.props.showCategoryActionMenu}
                reviewBySpacedRepetition={(): void =>
                  this.props.goToSpacedRepetition([category.categoryName])
                }
                reviewByWriting={(): void =>
                  this.props.goToWriting([category.categoryName])
                }
                showLevelBreakdownForSR={this.props.showLevelBreakdownForSR}
                showLevelBreakdownForWR={this.props.showLevelBreakdownForWR}
                shouldShowLevelProgressForSR={
                  this.props.shouldShowLevelProgressForSR
                }
                shouldShowLevelProgressForWR={
                  this.props.shouldShowLevelProgressForWR
                }
              />
            );
          }}
          keyExtractor={this.keyExtractor}
          onEndReachedThreshold={0.5}
          onEndReached={(): void => this.props.fetchNext()}
          onRefresh={this.props.refresh}
          refreshing={this.props.categoryListState.isRefreshing.get()}
          ListFooterComponent={
            <DefaultActivityIndicator
              activityState={this.props.categoryListState.fetchState}
              isRefreshing={this.props.categoryListState.isRefreshing}
              size="small"
              style={this.styles.activity_indicator}
            />
          }
        />
      </View>
    );
  }
}
