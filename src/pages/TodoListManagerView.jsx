import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import NavbarComponent from '../components/Navbar';
import TodoListComponent from '../components/TodoListComponent';

import TaskService from '../services/TaskService';

const TodoListManagerView = ({ route, navigation }) => {
    const [taskId, setTaskId] = useState(null);



    const remove = (event) => {
        if (event) {
            Alert.alert(
                "Apagar registro",
                "Deseja realmente apagar este registro?",
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Confirmar", onPress: () => TaskService.DeleteTask(route.params?.task_id, navigation) }
                ]
            );
        }
    }

    return (
        <View>
            <NavbarComponent navigation={navigation} childRemove={remove} taskId={route.params?.task_id} />
            <TodoListComponent navigation={navigation} route={route} />
        </View>
    );
};

export default TodoListManagerView;