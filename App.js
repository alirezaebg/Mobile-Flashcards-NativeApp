import React, { Component } from 'react'
import { View, Text, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Decks from './components/Decks'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import Constants from 'expo-constants'
import { purple, white, lightPurp } from './utils/colors'

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'



function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RouteConfigs = {
  Decks: {
    name: "Decks",
    component: Decks,
    options: {
      tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cards" size={30} color={color} />,
      tabBarLabel: () => <Text style={{ color: purple, fontSize: 12 }}>Decks</Text>
    }
  },
  NewDeck: {
    name: "NewDeck",
    component: NewDeck,
    options: {
      tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cards-spade" size={30} color={color} />,
      tabBarLabel: () => <Text style={{ color: purple, fontSize: 12 }}>New Deck</Text>
    }
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? lightPurp : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : lightPurp,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tab = createBottomTabNavigator()

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['Decks']} />
    <Tab.Screen {...RouteConfigs['NewDeck']} />
  </Tab.Navigator>
)

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen"
}
const StackConfig = {
  TabNav: {
    name: "Home",
    component: TabNav,
    options: { headerShown: false }
  },
  Deck: {
    name: "Deck",
    component: Deck,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      title: "Deck Information"
    }
  }
}
const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['Deck']} />
  </Stack.Navigator>
)

export default class App extends Component {
  render() {
    const store = createStore(reducer)
    return (
      <Provider store={store} >
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <NavigationContainer >
            <MainNav />
          </NavigationContainer>
        </View >
      </Provider>
    )
  }

}
