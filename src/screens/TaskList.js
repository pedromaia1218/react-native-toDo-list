import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
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
        showAddTask: false,
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
    
    addTask = newTask => {
        if (!newTask.description || !newTask.description.trim()) {
            Alert.alert('Dados inválidos', 'Tarefa não informada!')
            return
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            description: newTask.description,
            estimateAt: newTask.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)
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
                <AddTask
                    isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask}
                />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={25} color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} />
                </View>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => this.setState({ showAddTask: true })}
                    activeOpacity={0.7}
                >
                    <Icon name='plus' size={20} color={commonStyles.colors.secondary} />
                </TouchableOpacity>
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
        flex: 3,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 4,
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: normalize(50),
        marginLeft: 20,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: normalize(20),
        marginLeft: 20,
    },
    iconBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 15,
        marginTop: Platform.OS === 'ios' ? 40 : '3%'
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})