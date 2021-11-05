import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList
} from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'

import Task from '../components/Task'

export default class TaskList extends Component {

    state = {
        tasks: [{
            id: Math.random(),
            description: 'Comprar livro de Cálculo',
            estimateAt: new Date(),
            doneAt: new Date(),
        }, {
            id: Math.random(),
            description: 'Ler livro de Cálculo',
            estimateAt: new Date(),
            doneAt: null,
        }]
    }


    // A função toggleTask está sendo enviada para o componente Task
    // por meio das propriedades do flatList para ser usada no componente para alterar o estado
    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks })
    }


    // O que é renderizado na tela
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.tasks} keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} />
                </View>
            </View>
        )
    }
}


// Estilo para essa página
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    }
})