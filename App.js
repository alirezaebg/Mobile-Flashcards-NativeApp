// import 'react-native-gesture-handler'
import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import Deck from './components/Decks'
import { purple } from './utils/colors'
import NewDeck from './components/NewDeck'
import Constants from 'expo-constants'

// import { NavigationContainer } from "@react-navigation/native"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

export default function App() {

  function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
  }

  // const RouteConfigs = {
  //   Decks: {
  //     name: "Decks",
  //     component: Decks,
  //   },
  //   NewDeck: {
  //     name: "NewDeck",
  //     component: NewDeck,
  //   }
  // }

  // const TabNavigatorConfig = {
  //   navigationOptions: {
  //     header: null
  //   },
  //   tabBarOptions: {
  //     activeTintColor: Platform.OS === "ios" ? purple : white,
  //     style: {
  //       height: 56,
  //       backgroundColor: Platform.OS === "ios" ? white : purple,
  //       shadowColor: "rgba(0, 0, 0, 0.24)",
  //       shadowOffset: {
  //         width: 0,
  //         height: 3
  //       },
  //       shadowRadius: 6,
  //       shadowOpacity: 1
  //     }
  //   }
  // }

  // const Tab = createBottomTabNavigator()

  // const TabNav = () => (
  //   <Tab.Navigator {...TabNavigatorConfig}>
  //     <Tab.Screen {...RouteConfigs['Decks']} />
  //     <Tab.Screen {...RouteConfigs['NewDeck']} />
  //   </Tab.Navigator>
  // )


  return (
    <View style={{ flex: 1 }}>
      <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
      <Deck />
    </View>
  )
}
