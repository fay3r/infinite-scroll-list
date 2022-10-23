import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  error: string | null;
}

const ItemSeparator = () => <View style={styles.separator} />;

const InfiniteScrollList = <T extends unknown>({
  renderItem,
  isEndReached,
  onEndReached,
  keyExtractor,
  data,
  enableSearch = false,
  error,
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
    } else if (error) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{error}</Text>
          <TouchableOpacity style={styles.footerText} onPress={onEndReached}>
            <Text style={styles.tryAgainText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <ActivityIndicator style={styles.footerContainer} />;
    }
  }, [isEndReached, error, onEndReached]);

  const EmptyList = (
    <View style={styles.empty}>
      <Text style={styles.title}>:(</Text>
      <Text>No items to show</Text>
      {data.length > 0 ? null : (
        <TouchableOpacity onPress={onEndReached}>
          <Text style={styles.tryAgainText}>Try again</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <>
      {enableSearch ? (
        <TextInput placeholder={'Search...'} onChangeText={setSearchTerm} />
      ) : null}
      <FlatList
        data={filteredList}
        ListFooterComponent={isFiltering || data.length === 0 ? null : Footer}
        ListEmptyComponent={EmptyList}
        // @ts-ignore
        renderItem={renderItem}
        onEndReached={
          isFiltering || isEndReached || error ? null : onEndReached
        }
        onEndReachedThreshold={0.1}
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
  tryAgainText: {
    color: 'blue',
  },
});

export default InfiniteScrollList;
