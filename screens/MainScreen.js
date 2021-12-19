import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import ExploreScreen from '../screens/ExploreScreen'
import CompareScreen from '../screens/CompareScreen'
import SavedScreen from '../screens/SavedScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { FontAwesome5 } from '@expo/vector-icons'
import { connect } from 'react-redux'
import Header from '../components/Header'

const Tab = createBottomTabNavigator();

const MainScreen = () => {

    return (
        <View style={{ flex: 1}}>
            <Header />
            <Tab.Navigator
                screenOptions={{
                    headerShown: true,
                    tabBarActiveTintColor: '#5280E9',
                }}
            >
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <FontAwesome5 name="home" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Explore"
                    component={ExploreScreen}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <FontAwesome5 name="compass" color={color} size={size}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Compare"
                    component={CompareScreen} 
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <FontAwesome5 name="balance-scale" color={color} size={size}/>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Saved" 
                    component={SavedScreen}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <FontAwesome5 name="bookmark" color={color} size={size}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <FontAwesome5 name="user" color={color} size={size}/>
                        )
                    }}
                />
            </Tab.Navigator>
        </View>
        
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(MainScreen)
