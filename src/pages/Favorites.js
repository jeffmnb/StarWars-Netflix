import React, { useState } from 'react';

import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import colors from '../styles/colors';

import fonts from '../styles/fonts';

import logoEmpire from '../assets/logoEmpire.png';

import logoKylo from '../assets/logoKylo.png';

import { CardFilms } from '../components/CardFilms';
import { useEffect } from 'react';
import { deleteFavorite, loadFavorites } from '../libs/Storage';
import { TabRouter, useNavigation } from '@react-navigation/native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Feather } from '@expo/vector-icons';

import { LoadApp } from '../components/LoadApp';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Favorites = () => {

    const Navigation = useNavigation();

    const [favoritesShow, setFavoritesShow] = useState(false);
    const [noFavorite, setNoFavorite] = useState(true);
    const [favorites, setFavorites] = useState({});
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(true);

    const hundleInfoMain = (item) => {
        Navigation.navigate('InfoMore', item);
    };

    const hundleDelete = async (item) => {
        await deleteFavorite(item);
        setUpdate(oldSate => !oldSate);
    }

    useEffect(() => {

        const getAllFavorites = async () => {

            const data = await loadFavorites();

            setFavorites(data);

            if (Object.keys(data).length) {
                setFavoritesShow(true);
                setNoFavorite(false);
                setUpdate(oldSate => !oldSate);
            } else if (!Object.keys(data).length) {
                setFavoritesShow(false);
                setNoFavorite(true);
                setUpdate(oldSate => !oldSate);
            };

            setTimeout(() => {
                setLoading(false);
            }, 2000);

        };

        getAllFavorites();

    }, [update]);

    if (loading) {
        return <LoadApp />
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <Image source={logoEmpire} />
                <Text style={styles.title}>Favoritos</Text>
            </View>

            {
                favoritesShow && (

                    <View style={styles.defaultArea}>
                        <FlatList
                            keyExtractor={item => String(item.id)}
                            data={favorites}
                            renderItem={({ item }) => (
                                <Swipeable overshootRight={false} renderRightActions={() => (
                                    <TouchableOpacity activeOpacity={0.7} style={styles.trashArea} onPress={() => hundleDelete(item)}>
                                        <Feather name="trash-2" size={28} color={colors.greyLight} />
                                    </TouchableOpacity>
                                )}>
                                    <CardFilms image={item.image_url} onPress={() => hundleInfoMain(item)} />
                                </Swipeable>

                            )}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                )


            }

            {noFavorite && (
                <View style={styles.noResultArea}>
                    <Image source={logoKylo} />
                    <Text style={styles.txtNoResult}>Nenhum Favorito {'\n'} Adicionado</Text>
                </View>
            )

            }




        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: '18%',
        alignItems: 'center',
        backgroundColor: colors.dark,
        paddingHorizontal: 30,
    },

    title: {
        fontFamily: fonts.Bold,
        color: colors.white,
        fontSize: 30,
        marginLeft: 12
    },

    defaultArea: {
        width: '110%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 40,
    },

    noResultArea: {
        top: '25%',
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    txtNoResult: {
        fontFamily: fonts.SemiBold,
        fontSize: 15,
        color: colors.greyLight,
        textAlign: 'center',
        marginTop: 15
    },

    trashArea: {
        width: 50,
        height: 166,
        backgroundColor: colors.red,
        borderTopEndRadius: 6,
        borderBottomEndRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    }
})