/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import {
  UpdateTask
} from '../services/TaskService'

import { Box, Checkbox, Divider, Fab, Text, VStack } from 'native-base';
import { Ionicons } from 'react-native-vector-icons/Ionicons'
import { FontAwesome } from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

//import { AntDesign } from "@ant-design/icons";

var db = openDatabase({ name: 'TodoListApplication.db' });

const LobbyScreen = ({ route, navigation }) => {
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
    console.log('edit 2 => ', id);
    navigation.navigate('TodoListManager', { id });
  };
  const update = (e) => {
    console.log('e =>', e.completed);
    let obj = {
      taskId: e.task_id,
      title: e.title,
      description: e.description,
      date: e.date,
      completed: !e.completed,
    }
    UpdateTask(obj, navigation);
  };

  return (
    <View style={styles.container}>
      <Icon name="rocket" size={30} color="#900" />
      <Icon as={Ionicons} name="home" style={{ color: '#000' }} />
      <Icon
        as={Ionicons}
        name={Platform.OS ? 'ios-menu' : 'md-menu'}
        size={20}
        color="red"
      />
      <Icon as={FontAwesome} name="md-menu" style={{ color: '#000' }} />
      <Icon name='md-github' size={25} />

      <MaterialCommunityIcons name='ios-book' style={{ color: '#000' }} />
      <Button onPress={() => edit(null)} title={'add'} />

      {todoList.map(e => (
        <View style={styles.row} key={e.task_id}>
          <TouchableOpacity
            onPress={() => edit(e.task_id)}
          >
            <Checkbox isChecked={e.completed}
              onChange={() => update(e)}
              value={e.completed}>&nbsp;</Checkbox>
            <Box border="1" borderRadius="md">
              <VStack space="2" divider={<Divider />}>
                <Box px="4" pt="1">
                  <Text fontSize="lg">{e.title}</Text>
                </Box>
                <Box px="4" pt="1">
                  <Text fontSize="xs" >{e.description}</Text>
                </Box>
                <Box px="4" pb="1">
                  <Text fontSize="xs" >{e.date}</Text>
                </Box>
              </VStack>
            </Box>
          </TouchableOpacity>
        </View>
      ))
      }
    </View >
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
    padding: 8,
  },
  textColor: {
    color: '#fff',
  },
});

export default LobbyScreen;
