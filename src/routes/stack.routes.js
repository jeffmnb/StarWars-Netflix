import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main } from '../pages/Main';
import { InfoMore } from '../pages/InfoMore';

import { TabsRoute } from './tabs.routes';
import { Favorites } from '../pages/Favorites';
import { Seacrh } from '../pages/Search';
import { WatchScreen } from '../pages/WatchScreen';

export const StackRoute = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={TabsRoute} />
            <Stack.Screen name='InfoMore' component={InfoMore} />
            <Stack.Screen name='Favorites' component={Favorites} />
            <Stack.Screen name='Search' component={Seacrh} />
            <Stack.Screen name='WatchScreen' component={WatchScreen} />
        </Stack.Navigator>

    )
};