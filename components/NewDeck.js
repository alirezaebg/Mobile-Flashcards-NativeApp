import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { lightGreen } from '../utils/colors'
import { CommonActions } from '@react-navigation/native';

class NewDeck extends Component {
    state = {
        value: '',
        accept: true   //accept is true if user types 3 or more letters 
    }
    handleChange = (text) => {
        this.setState(() => ({
            value: text,
            accept: true
        }))
    }
    handlePress = () => {
        const { value } = this.state
        console.log(value.length)
        if (value.length >= 3) {
            this.props.dispatch(addDeck(value))
            //switch the view
            this.toMainView()
            // save to db
            saveDeckTitle(value)
                .then(() => this.setState(() => ({ value: '' })))
                .catch(err => console.log(err))
        }
        else {
            this.setState(() => ({
                accept: false
            }))
        }
    }
    toMainView = () => {
        this.props.navigation.dispatch(
            CommonActions.goBack({
                key: 'Decks',
            }))
    }
    render() {
        const { value, accept } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.text}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    value={value}
                    onChangeText={this.handleChange}
                />
                {(value.length < 3 && !accept) && <Text>Title should have 3 letters at least!</Text>}
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 100
    },
    text: {
        fontSize: 22,
        marginBottom: 20
    },
    textInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        fontSize: 16
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

export default connect()(NewDeck)