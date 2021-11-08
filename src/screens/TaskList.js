import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles, { normalize } from '../commonStyles'
import todayImage from '../../assets/imgs/today.jpg'
import Icon from 'react-native-vector-icons/FontAwesome'

import Task from '../components/Task'
import AddTask from './AddTask'

export default class TaskList extends Component {

    // Defining an initial state
    state = {
        showDoneTasks: true,
        showAddTask: true,
        visibleTasks: [],
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

    componentDidMount = () => {
        this.filterTasks()
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks })
    }

    // This function alter whether done tasks will be shown or not
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    // isPending vai checar se a task está pendente e retornar TRUE se estiver
    isPending = task => {
        return task.doneAt === null
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            visibleTasks = this.state.tasks.filter(this.isPending)
        }

        this.setState({ visibleTasks })
    }

    render() {

        // Pegando a data de hoje com o moment no formato que quero
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })}/>
                    <ImageBackground source={todayImage} style={styles.background}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                    size={25} color={commonStyles.colors.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
                            <Text style={styles.subtitle}>{today}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taskList}>
                        <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`}
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
        flex: 3,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: normalize(50),
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: normalize(20),
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 15,
        marginTop: Platform.OS === 'ios' ? 40 : '3%'
    }
})