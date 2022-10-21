import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useMemo, useState} from 'react';

interface Props<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: ListRenderItemInfo<T>) => React.ReactNode;
  onEndReached: () => void;
  isEndReached: boolean;
  isLoading?: boolean;
  enableSearch?: boolean;
}

const ItemSeparator = () => <View style={styles.separator} />;

const InfiniteScrollList = <T extends unknown>({
  renderItem,
  isEndReached,
  onEndReached,
  keyExtractor,
  data,
  isLoading,
  enableSearch = false,
}: Props<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const isFiltering = useMemo(
    () => searchTerm.trim().length !== 0,
    [searchTerm],
  );

  const filteredList = useMemo(
    () =>
      data.filter(item => {
        const regex = new RegExp(searchTerm, 'i');
        for (let property in item) {
          const value = item[property];
          if (typeof value === 'string' && value.match(regex)) {
            return true;
          }
        }
        return false;
      }),
    [searchTerm, data],
  );

  const Footer = useMemo(() => {
    if (isEndReached) {
      return (
        <Text style={[styles.footerContainer, styles.footerText]}>
          No more data to load
        </Text>
      );
    } else if (isLoading) {
      return <ActivityIndicator style={styles.footerContainer} />;
    } else {
      return null;
    }
  }, [isEndReached, isLoading]);

  const EmptyList = (
    <View style={styles.empty}>
      <Text style={styles.title}>:(</Text>
      <Text>No results found</Text>
    </View>
  );
  return (
    <>
      {enableSearch ? (
        <TextInput placeholder={'Search...'} onChangeText={setSearchTerm} />
      ) : null}
      <FlatList
        data={filteredList}
        ListFooterComponent={isFiltering ? null : Footer}
        ListEmptyComponent={EmptyList}
        // @ts-ignore
        renderItem={renderItem}
        onEndReached={isFiltering ? null : onEndReached}
        onEndReachedThreshold={0.4}
        keyExtractor={keyExtractor}
        style={styles.list}
        ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {flex: 1},
  separator: {
    height: 2,
    backgroundColor: 'white',
  },
  empty: {
    alignItems: 'center',
    height: 150,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerContainer: {marginVertical: 15},
  footerText: {width: '100%', textAlign: 'center'},
});

export default InfiniteScrollList;
