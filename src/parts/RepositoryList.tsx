import * as React from 'react';
import InfiniteScrollList from '../components/InfiniteScrollList';
import {useEffect} from 'react';
import {GithubEventItem} from '../components/GithubEventItem';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ApiStatus, fetchEvents, selectGithub} from '../redux/githubSlice';
import {useAppDispatch} from '../redux/store';

export const RepositoryList = () => {
  const dispatch = useAppDispatch();
  const {isEndReached, githubEvents, error, status, initialLoading} =
    useSelector(selectGithub);

  useEffect(() => {
    dispatch(fetchEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {initialLoading ? (
        <ActivityIndicator
          style={styles.indicator}
          testID={'activityIndicator'}
        />
      ) : (
        <InfiniteScrollList
          data={githubEvents}
          keyExtractor={item => item.id}
          renderItem={({item}) => <GithubEventItem itemData={item} />}
          onEndReached={() => dispatch(fetchEvents())}
          isEndReached={isEndReached}
          isLoading={status === ApiStatus.LOADING}
          error={error}
          enableSearch
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  indicator: {flex: 1, alignSelf: 'center'},
});
