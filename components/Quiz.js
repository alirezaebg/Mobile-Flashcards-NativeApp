import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { darkGreen, purple, red, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

//component for taking the quiz
class Quiz extends Component {
    state = {
        pageNum: 0,   //page number
        ans: false,   //answer mode
        score: 0      //quiz score
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            title: `${this.props.title} Quiz`,
        })
    }
    showAnswer = () => {
        this.setState(() => ({
            ans: true
        }))
    }
    handleYes = () => {
        const { pageNum, score } = this.state
        this.setState(() => ({
            ans: false,
            pageNum: pageNum + 1,
            score: score + 1
        }))
    }
    handleNo = () => {
        const { pageNum } = this.state
        this.setState(() => ({
            ans: false,
            pageNum: pageNum + 1,
        }))
    }
    handleStart = () => {
        this.setState(() => ({
            pageNum: 0,
            ans: false,
            score: 0
        }))
    }
    handleNotification = () => {
        clearLocalNotification().then(setLocalNotification)
    }
    render() {
        const { pageNum, ans, score } = this.state
        const { entry } = this.props
        if (entry.questions.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Sorry! There is no quiz available. Add a new card to start the quiz!</Text>
                </View>
            )
        }
        if (entry.questions.length != 0 && pageNum === entry.questions.length) {
            this.handleNotification()
            return (
                <View style={styles.container}>
                    <Text style={styles.titleText}>Quiz Result</Text>
                    <Text style={styles.text}>{`You scored ${(score * 100 / pageNum).toFixed(1)}% (${score} out of ${pageNum})`}</Text>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: darkGreen, marginTop: 40, marginBottom: 20}]}
                        onPress={this.handleStart}
                    >
                        <Text style={{ fontSize: 20, color: white }}>Start Over!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: red, marginVertical: 20}]}
                        onPress={() => this.props.navigation.navigate('Deck')}
                    >
                        <Text style={{ fontSize: 20, color: white }}>Return to Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Question {(pageNum + 1)} of {entry.questions.length}</Text>
                {(ans === false)
                    ? <Fragment>
                        <Text style={styles.text}>{entry.questions[pageNum].question}</Text>
                        <TouchableOpacity onPress={this.showAnswer}>
                            <Text style={{ textDecorationLine: 'underline', marginTop: 30, fontSize: 16 }}>Show Answer</Text>
                        </TouchableOpacity>
                    </Fragment>
                    : <Fragment>
                        <Text style={styles.text}>{entry.questions[pageNum].answer}</Text>
                        <Text style={{ fontSize: 20, color: purple, marginTop: 20 }}>Did you answer correctly?</Text>
                        <TouchableOpacity
                            style={[styles.yes, styles.btn]}
                            onPress={this.handleYes}
                        >
                            <Text style={{ fontSize: 20, color: white }}>Yaaay! 💪</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.no, styles.btn]}
                            onPress={this.handleNo}
                        >
                            <Text style={{ fontSize: 20, color: white }}>Errrr! 👎</Text>
                        </TouchableOpacity>
                    </Fragment>}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: "center",
    },
    titleText: {
        fontSize: 20,
        marginBottom: 80
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        color: darkGreen
    },
    yes: {
        backgroundColor: darkGreen,
        marginTop: 60,
        marginBottom: 20,
    },
    no: {
        backgroundColor: red,
        marginVertical: 20
    },
    btn: {
        padding: 15,
        borderRadius: 7,
        width: 200,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function mapStateToProps(state, { route }) {
    const { title } = route.params
    return {
        title,
        entry: state[title]
    }
}

export default connect(mapStateToProps)(Quiz)