import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'


class Deck extends Component {
    componentDidMount() {
        this.props.navigation.setOptions({
          title: this.props.name,
        })
      }
    render() {
        const { name, entries } = this.props
        return (
            <View>
                <Text>This is the Deck view!</Text>
                <Text>{name}</Text>
            </View>
        )
    }
}

function mapStateToProps(entries, { route, navigation }) {
    const { name } = route.params
    return {
        name,
        options: navigation.setOptions,
        entries
    }

}

export default connect(mapStateToProps)(Deck)