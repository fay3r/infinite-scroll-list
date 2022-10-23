import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppGithubEventType} from '../@types/GithubEventType';

type Props = {
  itemData: AppGithubEventType;
};
export const GithubEventItem = ({itemData}: Props) => {
  return (
    <View style={styles.container} key={itemData.id}>
      <Image source={{uri: itemData.avatarUrl}} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{itemData.login}</Text>
        <Text style={styles.description}>{itemData.repoName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'purple',
    borderWidth: 2,
    borderStyle: 'solid',
    minHeight: 65,
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  textContainer: {
    flex: 8,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'purple',
    fontSize: 18,
  },
  description: {
    marginTop: 3,
  },
});
