import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {RepositoryList} from './src/parts/RepositoryList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <RepositoryList />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 10, backgroundColor: 'white'},
});
