import React, { useEffect, useState } from 'react';

import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { LinearGradient } from 'expo-linear-gradient';

export const FilmView = ({ image, category, title, subTitle }) => {

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: '100%' }}>
                <Image style={{ width: '100%', height: '106%', opacity: 0.65 }} resizeMode='stretch' source={{uri:image}} />
            </View>


            <View style={{ position: 'absolute', paddingHorizontal: 20, bottom: 7 }}>
                <View style={[category == 'Filme' ? styles.labelFilme : styles.labelCharac]}>
                    <Text style={styles.txtLabelFilme}>{category}</Text>
                </View>

                <Text style={styles.TitleFilm}>{title}</Text>

                <Text style={styles.subTitleFilm}>{subTitle}</Text>
            </View>


        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '52%',
        paddingBottom: 40,
    },

    labelFilme: {
        width: 64,
        height: 26,
        borderRadius: 24,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    labelCharac: {
        width: 100,
        height: 26,
        borderRadius: 24,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    txtLabelFilme: {
        fontFamily: fonts.Bold,
        fontSize: 14,
        color: colors.white
    },

    TitleFilm: {
        fontFamily: fonts.Bold,
        fontSize: 28,
        color: colors.white,
    },

    subTitleFilm: {
        fontFamily: fonts.Regular,
        fontSize: 18,
        color: colors.white,
    }
});