import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import UserService from '../services/UserService';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handlerRemove = (event) => {
        event.preventDefault();
        this.props.childRemove(true);
    }

    loggout = () => {
        UserService.UpdateUser({ active: false, userId: this.props?.user?.params?.temp[0].user_id });
        this.props.navigation.navigate('Home');
    }

    render() {
        let removerAction = this.props.taskId != null && <TouchableOpacity onPress={(event) => this.handlerRemove(event)}>
            <View>
                <Text style={style.colorText}>Remover</Text>
            </View>
        </TouchableOpacity>;

        return (
            <View style={style.navbarStyle}>
                <View>
                    <TouchableOpacity onPress={() => (this.props?.user?.name != 'Lobby' 
                        ? this.props.navigation.dispatch(CommonActions.goBack()) 
                        : this.loggout())}>
                        <Text style={style.colorText}>{this.props?.user?.name != 'Lobby' ? 'Voltar' : 'Sair'}</Text>
                    </TouchableOpacity>
                </View>
                {removerAction}
            </View>
        );
    }
}
const style = StyleSheet.create({
    navbarStyle: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffe',
        borderBottomWidth: 1,
        borderBottomColor: '#ffd'
    },
    colorText: {
        color: '#4d0afe'
    }
});

export default NavbarComponent;