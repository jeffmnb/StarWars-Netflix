import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

import fonts from '../styles/fonts';

export const ModalFavorite = ({ image, title }) => {
    return (
        <View style={styles.container}>
            <Image source={image} />

            <Text style={styles.txtFavorite}>{title}</Text>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 320,
        height: 320,
        borderRadius: 24,
        backgroundColor: colors.dark,
        left: 45,
        top: '20%',
    },

    txtFavorite: {
        fontFamily: fonts.Bold,
        fontSize: 22,
        color: colors.white,
        textAlign: 'center'
    }
})