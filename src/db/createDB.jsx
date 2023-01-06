import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'TodoListApplication.db' });

const CreateDB = () => {
    db.transaction(function (txn) {
        console.log('Running create table task');
        txn.executeSql(
            `SELECT name FROM sqlite_master 
            WHERE type='table' AND name='task'`,
            [],
            function (tx, res) {
                console.log('Task Exists:', res.rows.length);
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS task', []);
                    console.log('dropped');
                    txn.executeSql(
                        `CREATE TABLE IF NOT EXISTS task(task_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  title VARCHAR(20), description VARCHAR(100), date DATETIME, hour VARCHAR(6),
                  completed BOOLEAN, user_id INT(10))`,
                        [],
                    );
                }
            },
        );
    });

    db.transaction(function (txn) {
        console.log('Running create table user');
        txn.executeSql(
            `SELECT name FROM sqlite_master 
            WHERE type='table' AND name='user'`,
            [],
            function (tx, res) {
                console.log('User Exists:', res.rows.length);
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS user', []);
                    console.log('dropped');
                    txn.executeSql(
                        `CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  name VARCHAR(100), password VARCHAR(100), active BOOLEAN)`,
                        [],
                    );
                }
            },
        );
    });
}

export default CreateDB;