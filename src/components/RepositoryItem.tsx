import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GithubEventType} from '../@types/GithubEventType';

type Props = {
  itemData: GithubEventType;
};
export const GithubEventItem = ({itemData}: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: itemData.avatarUrl}} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{itemData.title}</Text>
        <Text style={styles.description}>{itemData.description}</Text>
      </View>
    </TouchableOpacity>
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
