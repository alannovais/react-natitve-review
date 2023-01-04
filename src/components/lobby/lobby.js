/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ComponentLobby = () => {
  const edit = () => {
    console.log('edit 2');
  };
  const remove = () => {
    console.log('remove 2');
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={{color: '#fff'}}>ABC</Text>
        <Text style={{color: '#fff'}}>ABC</Text>
        <Text style={{color: '#fff'}}>ABC</Text>
        <Text style={{color: '#fff'}}>ABC</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={edit}
            style={{backgroundColor: '#fff', padding: 2, marginRight: 10}}>
            <Text style={{color: '#000'}}>ABC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={remove}
            style={{backgroundColor: '#fff', padding: 2, marginRight: 10}}>
            <Text style={{color: '#000'}}>ABC</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={{color: '#fff'}}>ABC</Text>
        <Text style={{color: '#fff'}}>ABC</Text>
        <Text style={{color: '#fff'}}>ABC</Text>
        <Text style={{color: '#fff'}}>ABC</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={edit}
            style={{backgroundColor: '#fff', padding: 2, marginRight: 10}}>
            <Text style={{color: '#000'}}>ABC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={remove}
            style={{backgroundColor: '#fff', padding: 2, marginRight: 10}}>
            <Text style={{color: '#000'}}>ABC</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#4d0afe',
    justifyContent: 'space-between',
    marginBottom: 5,
    height: 40,
    padding: 8,
  },
  textColor: {
    color: '#fff',
  },
});

export default ComponentLobby;
