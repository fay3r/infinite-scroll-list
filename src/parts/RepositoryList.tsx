import * as React from 'react';
import InfiniteScrollList from '../components/InfiniteScrollList';
import {useRef, useState} from 'react';
import {GithubEventType} from '../@types/GithubEventType';
import {mockData} from '../MOCK_DATA';
import {GithubEventItem} from '../components/RepositoryItem';
import {View} from 'react-native';

export const RepositoryList = () => {
  const [data, setData] = useState<GithubEventType[]>(mockData.slice(0, 20));
  const [isEndReached, setIsEndReached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lastIndex = useRef(20);

  const loadMore = async () => {
    if (!isLoading || !isEndReached) {
      console.log('about to load more');
      setIsLoading(true);
      setTimeout(() => {
        if (lastIndex.current === data.length) {
          lastIndex.current += 20;
          setData(mockData.slice(0, lastIndex.current));
        } else {
          setIsEndReached(true);
        }
        setIsLoading(false);
      }, 5000);
    }
  };

  return (
    <View style={{flex: 1}}>
      <InfiniteScrollList
        data={data}
        keyExtractor={item => item.title}
        renderItem={({item}) => <GithubEventItem itemData={item} />}
        onEndReached={loadMore}
        isEndReached={isEndReached}
        isLoading={isLoading}
        enableSearch
      />
    </View>
  );
};
