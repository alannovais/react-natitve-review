/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { StyleSheet, Button, TextInput, View, Alert } from 'react-native';
import UserService  from '../services/UserService';
import { openDatabase } from 'react-native-sqlite-storage';
import {
  StoreTask,
  UpdateTask,
} from '../services/TaskService';

var db = openDatabase({ name: 'TodoListApplication.db' });

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const access = () => {
    if (login != '' || password != '') {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM user', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log(temp)
          temp.length > 0 && navigation.navigate('Lobby', { temp });
        });
      });
    } else {
      Alert.alert('Hummm, verifica novamente seu usuário e senha =)', [
        { text: 'ok', onPress: () => { } },
      ]);
    }
  };

  const create = () => {
    if (login != '' || password != '') {
      let obj = {
        name: login,
        password,
      }

      let obj2 = {
        title: '',
        description: '',
        date: new Date(),
        hour: '',
        completed: true,
        userId: 1,
    }
      UserService.newStoreUser(obj);
      //StoreTask(obj2, null);
      // setLogin('');
      // setPassword('');
    } else {
      Alert.alert('Hummm, faltou alguma informação para completar seu cadastro, por favor revise os dados novamente =/', [
        { text: 'ok', onPress: () => { } },
      ]);
    }
  };

  return (
    <View style={styles.box}>
      <TextInput
        style={{}}
        placeholder="Login"
        onChangeText={setLogin}
        value={login}
        style={[styles.widthSizeInput, styles.borderInput]}
      />
      <TextInput
        style={{}}
        placeholder="Senha"
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
        style={[styles.widthSizeInput, styles.borderInput]}
      />
      <View style={styles.widthSizeInput}>
        <Button
          onPress={access}
          title={'Entrar'}
          backgroundColor={'#4d0afe'}
          color={'#4d0afe'}
        />
      </View>
      <View style={styles.widthSizeInput}>
        <Button
          onPress={create}
          title={'Cadastrar'}
          backgroundColor={'#4d0afe'}
          color={'#4d0afe'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  widthSizeInput: {
    width: 300,
    padding: 2,
    marginBottom: 20,
  },
  borderInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#4d0afe',
  },
});

export default LoginScreen;
