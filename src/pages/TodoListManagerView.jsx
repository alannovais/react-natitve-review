import React from 'react';
import { View, TextInput, Button } from 'react-native';
import {
    StoreTask,
    UpdateTask,
    DeleteTask
} from '../services/TaskService';

class TodoListManagerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: null,
            userId: null,
            title: '',
            description: '',
            date: '',
            time: '',
            completed: false
        }
    }

    componentDidMount(){
        const { id } = this.props.route.params;
        if (id != null) {
            this.setState({ taskId: id });
        }
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
        StoreTask(obj, this.props.navigation)
    }

    update = () => {
        let obj = {
            taskId: this.state.taskId,
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            completed: this.state.completed,
        }
        UpdateTask(obj, this.props.navigation);
    }

    remove = () => {
        DeleteTask(this.state.taskId, this.props.navigation)
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

const TodoListManagerView = ({ route, navigation }) => {
    return (
        <TodoListManagerComponent navigation={navigation} route={route} />
    );
};

export default TodoListManagerView;