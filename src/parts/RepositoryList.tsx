import * as React from 'react';
import InfiniteScrollList from '../components/InfiniteScrollList';
import {useEffect, useState} from 'react';
import {GithubEventItem} from '../components/RepositoryItem';
import {ActivityIndicator, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {fetchEvents, selectGithub} from '../redux/githubSlice';
import {useAppDispatch} from '../redux/store';

export const RepositoryList = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {isEndReached, githubEvents, error} = useSelector(selectGithub);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchEvents())
      .unwrap()
      .then(() => {
        setInitialLoading(false);
      })
      .catch(() => {
        setInitialLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>{githubEvents.length}</Text>
      {initialLoading ? (
        <ActivityIndicator style={{flex: 1, alignSelf: 'center'}} />
      ) : (
        <InfiniteScrollList
          data={githubEvents}
          keyExtractor={item => item.id}
          renderItem={({item}) => <GithubEventItem itemData={item} />}
          // @ts-ignore
          onEndReached={() => dispatch(fetchEvents())}
          isEndReached={isEndReached}
          error={error}
          enableSearch
        />
      )}
    </View>
  );
};
