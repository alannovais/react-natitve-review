import React from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { deleteTask, storeTask, updateTask } from '../services/taskService';

class TodoListManagerComponent extends React.Component {
    constructor(props) {
        super(props);
        const { id } = this.props.route.params;
        this.state = {
            taskId: null,
            userId: null,
            title: '',
            description: '',
            date: '',
            time: '',
            completed: false
        }
        console.log('state =>', this.state);
        console.log('route =>', id);
    }

    store = () => {
        console.log('state =>', this.state);
        let obj = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            completed: this.state.completed,
            userId: this.state.userId
        }
        storeTask(obj, this.props.navigation);
    }

    update = () => {
        let obj = {
            taskId, title, description, date, completed
        }
        updateTask(obj, navigation);
    }

    remove = () => {
        setTaskId(1);
        deleteTask(taskId, navigation)
    }



    render() {
        return (
            <View>
                <TextInput
                    style={{}}
                    placeholder="Título"
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                />
                <TextInput
                    placeholder="Descrição"
                    multiline={true}
                    numberOfLines={5}
                    style={{}}
                    onChangeText={(description) => this.setState({ description })}
                    value={this.state.description}
                />
                <Button title={'send'} onPress={this.store}></Button>
                <Button title={'update'} onPress={this.update}></Button>
                <Button title={'delete'} onPress={this.remove}></Button>
            </View >
        );
    };
}

const TodoListManager = ({ route, navigation }) => {
    return (
        <TodoListManagerComponent navigation={navigation} route={route} />
    );
};

export default TodoListManager;