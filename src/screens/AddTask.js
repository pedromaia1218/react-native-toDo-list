import React, { Component } from 'react'
import {
    Platform,
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'
import DateTimePicker from '@react-native-community/datetimepicker'

import commonStyles, { normalize } from '../commonStyles'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker
            value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date'
        />

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'
            >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Informe a tarefa...'
                        value={this.state.desc}
                        onChangeText={desc => this.setState({ desc })}
                    />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        padding: normalize(15),
        fontSize: normalize(21),
        textAlign: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: '2%'
    },
    button: {
        color: commonStyles.colors.today,
        margin: 20
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        height: normalize(40),
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
        margin: normalize(20),
        backgroundColor: '#FFF'
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: normalize(20),
        marginLeft: 20
    }
})