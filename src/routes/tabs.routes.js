import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Main } from '../pages/Main';
import { Favorites } from '../pages/Favorites';
import { Seacrh } from '../pages/Search';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export const TabsRoute = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.white,
            tabBarHideOnKeyboard: true,
            tabBarLabelPosition: 'below-icon',
            tabBarStyle: {
                backgroundColor: colors.black,
                borderTopWidth: 0,
                height: 65,
            }
        }}>

            <Tab.Screen name=' ' component={Main} options={{

                tabBarIcon: ({ color }) => (
                    <View style={{ top: '15%', justifyContent: 'center', alignItems: 'center', width: 50, height: 50, backgroundColor: colors.dark, borderRadius: 6 }}>
                        <Ionicons name="ios-home" size={20} color={color} />
                        <Text style={{ fontFamily: fonts.SemiBold, fontSize: 11, color: color }}>Home</Text>
                    </View>
                )

            }} />

            <Tab.Screen name='  ' component={Seacrh} options={{

                tabBarIcon: ({ color, size }) => (
                    <View style={{ top: '15%', justifyContent: 'center', alignItems: 'center', width: 52, height: 5 }}>
                        <FontAwesome name="search" size={20} color={color} />
                        <Text style={{ fontFamily: fonts.SemiBold, fontSize: 11, color: color }}>Pesquisar</Text>
                    </View>
                )

            }} />

            <Tab.Screen name='   ' component={Favorites} options={{

                tabBarIcon: ({ color, size }) => (
                    <View style={{ top: '15%', justifyContent: 'center', alignItems: 'center', width: 50, height: 5 }}>
                        <MaterialIcons name="favorite-border" size={24} color={color} />
                        <Text style={{ fontFamily: fonts.SemiBold, fontSize: 11, color: color }}>Favoritos</Text>
                    </View>
                )

            }} />

        </Tab.Navigator>
    )
};