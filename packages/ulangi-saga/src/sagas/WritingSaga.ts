/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { assertExists } from '@ulangi/assert';
import { DeepMutable, DeepPartial } from '@ulangi/extended-types';
import { SQLiteDatabase, Transaction } from '@ulangi/sqlite-adapter';
import { Action, ActionType, createAction } from '@ulangi/ulangi-action';
import { WritingScheduler } from '@ulangi/ulangi-common/core';
import { ErrorCode, VocabularyStatus } from '@ulangi/ulangi-common/enums';
import { Vocabulary } from '@ulangi/ulangi-common/interfaces';
import { VocabularyModel, WritingModel } from '@ulangi/ulangi-local-database';
import * as _ from 'lodash';
import * as moment from 'moment';
import { call, fork, put, take } from 'redux-saga/effects';
import { PromiseType } from 'utility-types';

import { errorConverter } from '../converters/ErrorConverter';
import { SagaConfig } from '../interfaces/SagaConfig';
import { SagaEnv } from '../interfaces/SagaEnv';
import { LevelSequenceStrategy } from '../strategies/LevelSequenceStrategy';
import { ProtectedSaga } from './ProtectedSaga';

export class WritingSaga extends ProtectedSaga {
  private sequenceStrategy = new LevelSequenceStrategy();
  private writingScheduler = new WritingScheduler();

  private userDb: SQLiteDatabase;
  private vocabularyModel: VocabularyModel;
  private writingModel: WritingModel;

  public constructor(
    userDb: SQLiteDatabase,
    vocabularyModel: VocabularyModel,
    writingModel: WritingModel
  ) {
    super();
    this.userDb = userDb;
    this.vocabularyModel = vocabularyModel;
    this.writingModel = writingModel;
  }

  public *run(_: SagaEnv, config: SagaConfig): IterableIterator<any> {
    yield fork([this, this.allowFetchVocabulary], config.writing.minPerLesson);
    yield fork([this, this.allowSaveResult], config.writing.maxLevel);
  }

  public *allowFetchVocabulary(minPerLesson: number): IterableIterator<any> {
    while (true) {
      const action: Action<ActionType.WRITING__FETCH_VOCABULARY> = yield take(
        ActionType.WRITING__FETCH_VOCABULARY
      );
      const {
        setId,
        initialInterval,
        reviewPriority,
        limit,
        selectedCategoryNames,
        includeFromOtherCategories,
      } = action.payload;

      try {
        yield put(
          createAction(ActionType.WRITING__FETCHING_VOCABULARY, { setId })
        );

        const levelSequence = this.sequenceStrategy.getLevelSequence(
          reviewPriority
        );

        const vocabularyList = yield call(
          [this, this.fetchVocabulary],
          setId,
          initialInterval,
          selectedCategoryNames,
          undefined,
          levelSequence,
          limit
        );

        if (
          vocabularyList.length < minPerLesson &&
          typeof selectedCategoryNames !== 'undefined' &&
          includeFromOtherCategories === true
        ) {
          const newList = yield call(
            [this, this.fetchVocabulary],
            setId,
            initialInterval,
            undefined,
            selectedCategoryNames,
            levelSequence,
            limit
          );
          vocabularyList.push(...newList);
        }

        if (vocabularyList.length < minPerLesson) {
          throw new Error(ErrorCode.WRITING__INSUFFICIENT_VOCABULARY);
        } else {
          yield put(
            createAction(ActionType.WRITING__FETCH_VOCABULARY_SUCCEEDED, {
              setId,
              vocabularyList: _.shuffle(vocabularyList),
            })
          );
        }
      } catch (error) {
        yield put(
          createAction(ActionType.WRITING__FETCH_VOCABULARY_FAILED, {
            setId,
            errorCode: errorConverter.getErrorCode(error),
            error,
          })
        );
      }
    }
  }

  public *allowSaveResult(maxLevel: number): IterableIterator<any> {
    while (true) {
      const action: Action<ActionType.WRITING__SAVE_RESULT> = yield take(
        ActionType.WRITING__SAVE_RESULT
      );
      const {
        vocabularyList,
        feedbackList,
        autoArchiveSettings,
      } = action.payload;

      try {
        yield put(createAction(ActionType.WRITING__SAVING_RESULT, null));

        const editedVocabularyList = Array.from(feedbackList.entries()).map(
          ([vocabularyId, feedback]): DeepPartial<Vocabulary> => {
            const vocabulary = assertExists(vocabularyList.get(vocabularyId));

            const editedVocabulary: DeepMutable<DeepPartial<Vocabulary>> = {
              vocabularyId: vocabulary.vocabularyId,
              writing: {
                lastWrittenAt: moment().toDate(),
                level: this.writingScheduler.getNextLevel(
                  vocabulary,
                  feedback,
                  maxLevel
                ),
              },
            };

            if (
              this.writingScheduler.willBeArchived(
                vocabulary,
                feedback,
                maxLevel,
                autoArchiveSettings
              )
            ) {
              editedVocabulary.vocabularyStatus = VocabularyStatus.ARCHIVED;
            }
            return editedVocabulary;
          }
        );

        yield call(
          [this.userDb, 'transaction'],
          (tx: Transaction): void => {
            this.vocabularyModel.updateMultipleVocabulary(
              tx,
              editedVocabularyList.map(
                (vocabulary): [DeepPartial<Vocabulary>, undefined] => [
                  vocabulary,
                  undefined,
                ]
              ),
              'local'
            );
          }
        );

        yield put(
          createAction(ActionType.WRITING__SAVE_RESULT_SUCCEEDED, null)
        );
      } catch (error) {
        yield put(
          createAction(ActionType.WRITING__SAVE_RESULT_FAILED, {
            error,
            errorCode: errorConverter.getErrorCode(error),
          })
        );
      }
    }
  }

  private *fetchVocabulary(
    setId: string,
    initialInterval: number,
    selectedCategoryNames: undefined | string[],
    excludedCategoryNames: undefined | string[],
    levelSequence: readonly number[],
    limit: number
  ): IterableIterator<any> {
    let vocabularyList: Vocabulary[] = [];

    const levels = levelSequence.slice();
    // Fetch vocabulary by each level until the limit is reached

    while (levels.length > 0 && vocabularyList.length < limit) {
      const currentLevel = assertExists(levels.shift());
      const remain = limit - vocabularyList.length;

      const result: PromiseType<
        ReturnType<WritingModel['getDueVocabularyList']>
      > = yield call(
        [this.writingModel, 'getDueVocabularyListByLevel'],
        this.userDb,
        setId,
        currentLevel,
        initialInterval,
        remain,
        true,
        selectedCategoryNames,
        excludedCategoryNames
      );

      let { vocabularyList: newList } = result;

      // Filter out vocabulary that does not have any definitions
      newList = newList.filter(
        (vocabulary: Vocabulary): boolean => vocabulary.definitions.length !== 0
      );

      vocabularyList = vocabularyList.concat(newList);
    }

    return vocabularyList;
  }
}
