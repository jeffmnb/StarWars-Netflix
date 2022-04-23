import React from 'react';

import { StyleSheet, View } from 'react-native';

import LottieView from 'lottie-react-native';

import LottieApp from '../assets/lottieRobot.json';
import colors from '../styles/colors';

export const LoadApp = () => {
    return (
        <View style={styles.container}>
            <LottieView autoPlay loop source={LottieApp} style={styles.animation}/>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.dark,
    },

    animation:{
        backgroundColor:colors.dark,
        width:270,
        height:270
    }
})