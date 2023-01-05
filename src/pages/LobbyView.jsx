/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';0

var db = openDatabase({ name: 'TodoListApplication.db' });

const LobbyScreen = ({ navigation }) => {
  const [todoList, setTodoList] = useState([]);

  const loadTodoList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM task', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setTodoList(temp);
      });
    });
  };

  loadTodoList();

  const edit = (id) => {
    console.log('edit 2');
    navigation.navigate('TodoListManager', { id });
  };
  const remove = () => {
    console.log('remove 2');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={edit}
        style={{ backgroundColor: '#fff', padding: 2, marginRight: 10 }}>
        <Text style={{ color: '#000' }}>ABC</Text>
      </TouchableOpacity>
      {todoList.map(e => (
        <View style={styles.row} key={e.task_id}>
          <Text style={{ color: '#fff' }}>{e.title}</Text>
          <Text style={{ color: '#fff' }}>ABC</Text>
          <Text style={{ color: '#fff' }}>ABC</Text>
          <Text style={{ color: '#fff' }}>ABC</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => edit(e.task_id)}
              style={{ backgroundColor: '#fff', padding: 2, marginRight: 10 }}>
              <Text style={{ color: '#000' }}>ABC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => remove()}
              style={{ backgroundColor: '#fff', padding: 2, marginRight: 10 }}>
              <Text style={{ color: '#000' }}>ABC</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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

export default LobbyScreen;
