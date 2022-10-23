import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {RepositoryList} from './src/parts/RepositoryList';
import {Provider} from 'react-redux';
import {setupStore} from './src/redux/store';

const App = () => {
  return (
    <Provider store={setupStore()}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <RepositoryList />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 10, backgroundColor: 'white'},
});
