import React, { useEffect, useState } from 'react';

import { SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { FilmView } from '../components/FilmView';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { ModalFavorite } from '../components/ModalFavorite';

import IconFavorite from '../assets/IconFavorite.png';
import { saveFavorite } from '../libs/Storage';

export const InfoMore = () => {

    const Navigation = useNavigation();

    const [watchActive, setWatchActive] = useState();

    const Route = useRoute();
    const data = Route.params;

    useEffect(() => {
        setWatchActive(data.watch);
    });

    const [modalFavorite, setModalFavorite] = useState(false);

    const hundleFavorite = async (item) => {
        setModalFavorite(true);

        await saveFavorite(item);

        setTimeout(() => {
            setModalFavorite(false);
        }, 1500);
    };


    const hundleWatch = () => {

        Navigation.navigate('WatchScreen', data.trailer_url);

    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'light-content'} translucent />

            <FilmView image={data.image_url} category={data.category} title={data.title} subTitle={data.subTitle} />

            <View style={{ width: 50, height: 50, position: 'absolute', top: '7%', left: '5%' }}>
                <Ionicons name="chevron-back" size={35} color={colors.white} onPress={() => Navigation.navigate('Main')} />
            </View>

            {
                watchActive ? (
                    <View style={styles.areaActions}>

                        <View style={styles.areaFavorites}>
                            <MaterialIcons name="add-circle-outline" size={27} color={colors.greyLight} onPress={() => hundleFavorite(data)} />
                            <Text style={{ fontFamily: fonts.SemiBold, fontSize: 11, color: colors.greyLight }} onPress={() => hundleFavorite(data)}>Favoritos</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.6} style={styles.areaWatch} onPress={hundleWatch}>
                            <Ionicons name="ios-play" size={22} color="black" />
                            <Text style={styles.txtWatch}>Assistir</Text>
                        </TouchableOpacity>

                    </View>

                ) :

                    <View style={styles.areaActionsWithoutWatch}>
                        <View style={styles.areaFavorites}>
                            <MaterialIcons name="add-circle-outline" size={27} color={colors.greyLight} onPress={() => hundleFavorite(data)} />
                            <Text style={{ fontFamily: fonts.SemiBold, fontSize: 11, color: colors.greyLight }} onPress={() => hundleFavorite(data)}>Favoritos</Text>
                        </View>
                    </View>

            }

            <ScrollView>

                <View style={styles.areaDescription}>
                    <Text style={styles.titleDescription}>Descrição</Text>

                    <Text style={styles.txtDescription}>
                        {data.description}
                    </Text>
                </View>

            </ScrollView>

            <Modal animationType='slide' visible={modalFavorite} transparent={true}>
                <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <ModalFavorite image={IconFavorite} title={`Favorito Adicionado ${'\n'} com sucesso!`} />
                </View>
            </Modal>









        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.dark,
    },

    areaActions: {
        width: '90%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 15,
        marginTop: 8,
        marginBottom: 30,

    },

    areaActionsWithoutWatch: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 30,
        marginLeft: '78%'
    },

    areaFavorites: {
        width: 50,
        height: 40,
        marginLeft: '5%',
        alignItems: 'center'
    },

    areaWatch: {
        width: 110,
        height: 39,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        marginLeft: '41%',
    },

    txtWatch: {
        marginLeft: 9,
        fontFamily: fonts.Bold,
        fontSize: 15,
        color: colors.black
    },

    areaInfo: {
        width: 60,
        height: 40,
        marginRight: 60,
        alignItems: 'center'
    },

    titleDescription: {
        fontFamily: fonts.Black,
        fontSize: 22,
        color: colors.white,
        marginBottom: 20
    },

    txtDescription: {
        fontFamily: fonts.Regular,
        fontSize: 14,
        color: colors.white,
        textAlign: 'justify',
    },

    areaDescription: {
        paddingHorizontal: 20
    }
});