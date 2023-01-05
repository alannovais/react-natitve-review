/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import {StyleSheet, Button, TextInput, View, Alert} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState(null);

  const access = () => {
    console.log('check', login, password);
    if (login != '' || password != null) {
      navigation.navigate('Lobby');
      setLogin('');
      setPassword(null);
    } else {
      Alert.alert('Please check out again! =(', 'Login or Password is wrong', [
        {text: 'ok', onPress: () => {}},
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
          title={'Sign up'}
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
