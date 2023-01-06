import React from 'react';
import { View, Button, TextInput, TouchableOpacity } from 'react-native';
import {
    StoreTask,
    UpdateTask,
} from '../services/TaskService';

//styles frameworks
import { Box, Checkbox, Input } from 'native-base';
import DatePicker from 'react-native-date-picker';

class TodoListComponent extends React.Component {
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
        if (this.props.route.params != null) {
            const { task_id, user_id, title, description, date, hour, completed } = this.props.route.params;
            if (task_id != null) {
                this.setState({ taskId: task_id });
                this.setState({ userId: user_id });
                this.setState({ title: title });
                this.setState({ description: description });
                this.setState({ dateString: date });
                this.setState({ hourString: hour });
                this.setState({ completed: completed });
            }
        }
    }

    formatDataToStore = () => {
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
            hour: this.state.hourString,
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
            hour: this.state.hourString,
            completed: this.state.completed,
        }
        UpdateTask(obj, this.props.navigation);
    }

    save = () => {
        if (this.state.taskId != null)
            this.update();
        else
            this.store();
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
        let checkbox = this.state.taskId != null && <Checkbox size='sm' isChecked={this.state.completed}
            onChange={() => this.setState({ completed: !this.state.completed })}
            value={this.state.completed}>Completada?</Checkbox>;
        return (
            <View style={{ padding: 15 }}>
                <Box alignItems="center" marginBottom='2'>
                    <Input mx="3" placeholder="Título" w="100%"
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title} />
                </Box>
                <Box alignItems="center" marginBottom='2'>
                    <Input mx="3" placeholder="Descrição" w="100%"
                        multiline
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description} />
                </Box>
                <Box flexDirection='row' marginBottom='2'>
                    <Box marginRight='2'>
                        <TextInput style={{ borderWidth: 1, borderColor: '#ccd', borderRadius: 5 }} onTouchStart={() => this.setState({ open: true })} placeholder="Data e hora de conclusão"
                            value={this.getDateFormat(this.state.dateString)} />
                        <DatePicker
                            modal
                            mode='date'
                            open={this.state.open}
                            date={this.state.date}
                            onConfirm={(date) => {
                                this.setState({ open: false });
                                this.setState({ dateString: date.toString() });
                                this.setState({ date: date });
                            }}
                            onCancel={() => {
                                this.setState({ open: false })
                            }}
                        />
                    </Box>
                    <Box>
                        <TextInput style={{ borderWidth: 1, borderColor: '#ccd', borderRadius: 5, width: 180 }}
                            onTouchStart={() => this.setState({ openHour: true })} placeholder="Hora"
                            value={this.state.hourString}
                        />
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
                                this.setState({ openHour: false })
                            }}
                        />
                    </Box>
                </Box>
                <Box marginBottom='2'>
                    {checkbox}
                </Box>
                <Button title={'Salvar'} color='#4d0afe' onPress={() => this.save()}></Button>
            </View >
        );
    };
}

export default TodoListComponent;