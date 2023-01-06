/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import {
  UpdateTask
} from '../services/TaskService'

import { Box, Checkbox, Text, VStack } from 'native-base';
import NavbarComponent from '../components/Navbar';
import {
  UpdateUser
} from '../services/UserService';

var db = openDatabase({ name: 'TodoListApplication.db' });

const LobbyScreen = ({ route, navigation }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    updateUserActive();
  }, []);
  
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
  
  const updateUserActive = () => {
    let obj = {
      active: true,
      userId: route.params.temp[0].user_id
    }
    UpdateUser(obj);
  }
  
  const edit = (obj) => {
    navigation.navigate('TodoListManager', obj);
  };
  const update = (e) => {
    let obj = {
      taskId: e.task_id,
      title: e.title,
      description: e.description,
      date: e.date,
      completed: !e.completed,
    }
    UpdateTask(obj, navigation);
  };

  const getDateFormat = (date) => {
    if (date) {
      const weekday = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
      const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      let d = new Date(date)
      return `${weekday[d.getDay()]}, ${month[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
    }
    return '';
  }
  
  return (
    <View style={styles.container}>
      <NavbarComponent navigation={navigation} user={route} taskId={null} />
      <TouchableOpacity onPress={() => edit(null)} style={styles.fakeFabButton}>
        <Text style={{ textAlign: 'center', marginTop: 13, color: '#fff' }}>+</Text>
      </TouchableOpacity>
      {todoList.map(e => (
        < View style={styles.row} key={e.task_id} >
          <TouchableOpacity
            onPress={() => edit(e)}
          >
            <Box flexDirection='row'>
              <Box marginTop='2.5'>
                <Checkbox isChecked={e.completed}
                  onChange={() => update(e)}
                  value={e.completed}>&nbsp;</Checkbox>
              </Box>
              <Box>
                <Box border="1" borderRadius="md">
                  <VStack space="2">
                    <Box px="4" pt="1">
                      <Text fontSize="lg">{e.title}</Text>
                    </Box>
                    <Box px="4" pt="1">
                      <Text fontSize="xs" >{e.description}</Text>
                    </Box>
                    <Box px="4" pb="1">
                      <Text fontSize="xs" >{`${getDateFormat(e.date)} ${e.hour}`}</Text>
                    </Box>
                  </VStack>
                </Box>
              </Box>
            </Box>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccd', width: '100%' }}><Text>&nbsp;</Text></View>
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
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 8,
  },
  textColor: {
    color: '#fff',
  },
  fakeFabButton: {
    position: 'absolute',
    top: 300,
    right: 50,
    alignSelf: 'flex-end',
    borderRadius: 100,
    backgroundColor: '#4d0afe',
    height: 50,
    width: 50
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

});

export default LobbyScreen;
