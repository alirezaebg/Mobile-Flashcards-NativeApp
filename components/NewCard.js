import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/helpers'
import { addCard } from '../actions'
import { lightGreen } from '../utils/colors'

class NewCard extends Component {
    state = {
        question: '',
        answer: '',
        accept: true
    }
    handleQuestion = (text) => {
        this.setState(() => ({
            question: text,
            accept: true
        }))
    }
    handleAnswer = (text) => {
        this.setState(() => ({
            answer: text,
            accept: true
        }))
    }
    handlePress = () => {
        const { question, answer } = this.state
        const card = { question, answer }
        const { title } = this.props
        if (question.length >= 3 && answer.length >= 2) {  //qualified as a new card if fulfils these
            //update store
            this.props.dispatch(addCard(title, card))
            //switch the view
            this.props.navigation.goBack()
            // save to AsyncStorage
            addCardToDeck(title, card)
        }
        else {
            this.setState(() => ({
                accept: false
            }))
        }
    }

    render() {
        const { question, answer, accept } = this.state
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.text}>Enter the new card information</Text>
                    <TextInput
                        placeholder='-Enter Question-'
                        style={styles.textInput}
                        value={question}
                        onChangeText={this.handleQuestion}
                    />
                    <TextInput
                        placeholder='-Enter Answer-'
                        style={styles.textInput}
                        value={answer}
                        onChangeText={this.handleAnswer}
                    />
                    {(question.length < 3 || answer.length < 2) && !accept && <Text>Not a valid card. Choose more letters!</Text>}
                    
                    <View style={styles.submitView}>
                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={this.handlePress}
                        >
                            <Text style={styles.submitText}>
                                SUBMIT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 100
    },
    text: {
        fontSize: 22,
        marginBottom: 20
    },
    textInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 20
    },
    submitView: {
        flex: 1,
        alignItems: "center",
        marginVertical: 40
    },
    submitBtn: {
        backgroundColor: lightGreen,
        padding: 10,
        width: 200,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center'
    },
    submitText: {
        fontSize: 20,
        textAlign: 'center',
    }
})

function mapStateToProps(state, { route }) {
    const { title } = route.params
    return {
        title,
        entry: state[title]
    }
}

export default connect(mapStateToProps)(NewCard)