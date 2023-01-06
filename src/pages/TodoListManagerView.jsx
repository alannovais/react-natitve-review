import React from 'react';
import { View, Button, TextInput, TouchableOpacity } from 'react-native';
import {
    StoreTask,
    UpdateTask,
    DeleteTask
} from '../services/TaskService';

//styles frameworks
import { Box, Checkbox, Input } from 'native-base';
import DatePicker from 'react-native-date-picker';
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
            completed: false,
            date: new Date(),
            open: false,
            dateString: '',
            hour: new Date(),
            hourString: '',
            openHour: false,
        }
    }

    componentDidMount() {
        const { id } = this.props.route.params;
        if (id != null) {
            this.setState({ taskId: id });
        }
    }

    formatDataToStore = () => {
        console.log('date => ', this.state.dateString, this.state.hourString);
        let format = new Date(this.state.dateString);
        let hour = this.state.hourString.split(':')[0];
        let minutes = this.state.hourString.split(':')[1];
        let formatRefactory = new Date(format.getFullYear(), format.getMonth(), format.getDate(), hour.padStart(2, '0'), minutes);
        console.log('format =>', formatRefactory);
    }

    store = () => {
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

    save = () => {
        //console.log('save => ', this.state.date);
        this.formatDataToStore();
        // if (this.state.taskId != null)
        //     this.update();
        // else
        //     this.store();
    }

    remove = () => {
        DeleteTask(this.state.taskId, this.props.navigation)
    }

    getDateFormat = (date) => {
        if (date) {
            const weekday = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
            const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            let d = new Date(date)
            return `${weekday[d.getDay()]}, ${month[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
        }
        return '';
    }

    render() {
        let checkbox = this.state.taskId != null && <Checkbox isChecked={this.state.completed}
            onChange={() => this.setState({ completed: !this.state.completed })}
            value={this.state.completed}>Completada?</Checkbox>;
        let remove = this.state.taskId != null && <Button title={'delete'} onPress={this.remove}></Button>;
        return (
            <View>
                <Box alignItems="center">
                    <Input mx="3" placeholder="Título" w="100%"
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title} />
                </Box>
                <Box alignItems="center">
                    <Input mx="3" placeholder="Descrição" w="100%"
                        multiline
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description} />
                </Box>


                <Box alignItems="center">
                    <TextInput mx="3" onTouchStart={() => this.setState({ open: true })} placeholder="Data e hora de conclusão" w="100%"
                        value={this.getDateFormat(this.state.dateString)} />
                    <DatePicker
                        modal
                        mode='date'
                        open={this.state.open}
                        date={this.state.date}
                        onConfirm={(date) => {
                            this.setState({ open: false });
                            this.setState({ dateString: date.toString() });
                        }}
                        onCancel={() => {
                            this.setOpen({ open: false })
                        }}
                    />

                </Box>

                <Box>
                    <TextInput mx="3" onTouchStart={() => this.setState({ openHour: true })} placeholder="Hora" w="100%"
                        value={this.state.hourString} />
                    <DatePicker
                        modal
                        mode='time'
                        open={this.state.openHour}
                        date={this.state.hour}
                        onConfirm={(hour) => {
                            this.setState({ openHour: false });
                            this.setState({ hourString: `${hour.getHours()}:${hour.getMinutes()}` });
                        }}
                        onCancel={() => {
                            this.setOpen({ openHour: false })
                        }}
                    />
                </Box>

                <Box >
                    {checkbox}
                </Box>
                <Box >
                    {remove}
                </Box>
                <Button title={'Salvar'} onPress={() => this.save()}></Button>
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