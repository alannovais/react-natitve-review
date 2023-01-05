import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'TodoListApplication.db' });

const GetAllTask = () => {
    let resultQueryGetAll = [];
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM task', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
            }
            return temp;
        });
    });
}

const StoreTask = (task, navigation) => {
    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO task (title, description, date, completed, user_id) VALUES (?,?,?,?,?)',
            [task.title, task.description, task.date, task.completed],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'You are Registered Successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('Lobby'),
                            },
                        ],
                        { cancelable: false },
                    );
                } else { alert('Registration Failed'); }
            },
        );
    });
};

const UpdateTask = (task, navigation) => {
    console.log('update', task);
    db.transaction(function (tx) {
        tx.executeSql(
            'UPDATE task set title=?, description=?, date=?, completed=? WHERE task_id=?',
            [task.title, task.description, task.date, task.completed, task.taskId],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'You are Registered Successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('Lobby'),
                            },
                        ],
                        { cancelable: false }
                    );
                } else alert('Registration Failed');
            }
        );
    });
}

const DeleteTask = (taskId, navigation) => {
    console.log('delete', taskId);
    db.transaction(function (tx) {
        tx.executeSql(
            'DELETE FROM task WHERE task_id=?',
            [taskId],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'You are Registered Successfully',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('Lobby'),
                            },
                        ],
                        { cancelable: false }
                    );
                } else alert('Registration Failed');
            }
        );
    });
}

module.exports = {
    GetAllTask,
    StoreTask,
    UpdateTask,
    DeleteTask
};

