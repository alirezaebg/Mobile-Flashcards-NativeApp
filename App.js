import React, { Component } from 'react'
import { View, Text, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Decks from './components/Decks'
import Deck from './components/Deck'
import NewCard from './components/NewCard'
import NewDeck from './components/NewDeck'
import Quiz from './components/Quiz'
import Constants from 'expo-constants'
import { purple, white, lightPurp, orange, black } from './utils/colors'
import { setLocalNotification } from './utils/helpers'

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'

//status bar component
function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

//settings for tab view
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

//creating a tab view
const Tab= Platform.OS==='ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()

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

//options for the header
const opt = {
  headerTintColor: white,
  headerTitleStyle: {
    fontSize: 24
  },
  headerStyle: {
    backgroundColor: orange,
    height: 60,
  },
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
      headerTitleStyle: {
        fontSize: 24
      },
      headerStyle: {
        backgroundColor: orange,
        height: 60,
      },
      title: "Deck Information",
    }
  },
  NewCard: {
    name: "New Card",
    component: NewCard,
    options: {
      ...opt,
      title: 'New Card',
      headerBackTitle: 'Back'
    }
  },
  Quiz: {
    name: "Quiz Time",
    component: Quiz,
    options: {
      ...opt,
      title: 'Quiz',
      headerBackTitle: 'Back'
    }
  }
}

//creating a stack navigation
const Stack = createStackNavigator();
const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['Deck']} />
    <Stack.Screen {...StackConfig['NewCard']} />
    <Stack.Screen {...StackConfig['Quiz']} />
  </Stack.Navigator>
)

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
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
