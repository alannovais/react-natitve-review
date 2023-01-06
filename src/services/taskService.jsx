import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'TodoListApplication.db' });

const TaskService = {
    GetAllTask: () => {
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
    },
    StoreTask: (task, navigation) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO task (title, description, date, hour, completed, user_id) VALUES (?,?,?,?,?,?)',
                [task.title, task.description, task.date, task.hour, task.completed, task.userId],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Tarefa criada com sucesso',
                            '',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Lobby'),
                                },
                            ],
                            { cancelable: false },
                        );
                    } else { alert('Ops, ocorreu um erro, tente novamente =('); }
                },
            );
        });
    },
    UpdateTask: (task, navigation) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE task set title=?, description=?, date=?, hour=?, completed=? WHERE task_id=?',
                [task.title, task.description, task.date, task.hour, task.completed, task.taskId],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Registro atualizado',
                            '',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Lobby'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Ops, ocorreu um erro, tente novamente =(');
                }
            );
        });
    },
    DeleteTask: (taskId, navigation) => {
        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE FROM task WHERE task_id=?',
                [taskId],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Registro removido',
                            '',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Lobby'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Ops, ocorreu um erro, tente novamente =(');
                }
            );
        });
    }
}

export default TaskService;

