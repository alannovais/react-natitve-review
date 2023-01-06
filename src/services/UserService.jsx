import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'TodoListApplication.db' });

const GetAllUser = () => {
    let resultQueryGetAll = [];
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM user', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
            }
            return temp;
        });
    });
}

const StoreUser = (user) => {
    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO user (name, password, active) VALUES (?,?,?)',
            [user.name, user.password, user.active],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Usuário cadastrado com sucesso',
                        'Faça seu login =D!',
                        [
                            {
                                text: 'Ok',
                                onPress: () => {},
                            },
                        ],
                        { cancelable: false },
                    );
                } else { alert('Ops, ocorreu um erro, tente novamente por favor =('); }
            },
        );
    });
};

const UpdateUser = (user) => {
    console.log('update', user);
    db.transaction(function (tx) {
        tx.executeSql(
            'UPDATE user set active=? WHERE user_id=?',
            [user.active, user.userId],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    console.log('Usuário autenticado');
                } else alert('Ops, ocorreu um erro, tente novamente =(');
            }
        );
    });
}

module.exports = {
    GetAllUser,
    StoreUser,
    UpdateUser,
};

