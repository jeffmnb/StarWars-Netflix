import React from 'react';

import { FlatList, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FilmView } from '../components/FilmView';

import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { CardFilms } from '../components/CardFilms';

import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

import api from '../services/api';

import { ModalFavorite } from '../components/ModalFavorite';
import IconFavorite from '../assets/IconFavorite.png';
import { saveFavorite } from '../libs/Storage';

export const Main = () => {

    const Navigation = useNavigation();

    const [films, setFilms] = useState({});
    const [characters, setCharacters] = useState({});
    const [modalFavorite, setModalFavorite] = useState(false);

    const hundleInfoMoreFilms = (item) => {
        Navigation.navigate('InfoMore', {
            id: item.id,
            category: 'Filme',
            image_url: `${item.image_url}`,
            title: item.title,
            subTitle: item.subtitle,
            watch: true,
            description: item.description,
            trailer_url: item.trailer_url
        });
    };

    const hundleInfoMoreCharac = (item) => {
        Navigation.navigate('InfoMore', {
            id: item.id,
            category: 'Personagem',
            image_url: `${item.image_url}`,
            title: item.title,
            subTitle: item.subtitle,
            watch: false,
            description: item.description
        });
    };


    useEffect(() => {

        const getAllFilms = async () => {

            const data = await api.get('/filmes');

            setFilms(data.data);

        };

        const getAllCharacters = async () => {

            const data = await api.get('/personagens');

            setCharacters(data.data);

        };

        getAllFilms();
        getAllCharacters();

    }, []);

    const hundleInfoMain = () => {
        Navigation.navigate('InfoMore', {
            category: 'Filme',
            image_url: 'https://upload.wikimedia.org/wikipedia/pt/thumb/3/30/Star_Wars_Epis%C3%B3dio_1_Amea%C3%A7a_Fantasma.jpg/240px-Star_Wars_Epis%C3%B3dio_1_Amea%C3%A7a_Fantasma.jpg',
            title: films[0].title,
            subTitle: films[0].subtitle,
            watch: true,
            description: films[0].description
        })
    };

    const hundleFavorite = async (item) => {
        setModalFavorite(true);

        await saveFavorite(item);

        setTimeout(() => {
            setModalFavorite(false);
        }, 1500);
    };


    const hundleWatch = () => {

        Navigation.navigate('WatchScreen', "https://www.youtube.com/watch?v=bD7bpG-zDJQ");

    };

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle={'light-content'} translucent />

            <FilmView image={'https://upload.wikimedia.org/wikipedia/pt/thumb/3/30/Star_Wars_Epis%C3%B3dio_1_Amea%C3%A7a_Fantasma.jpg/240px-Star_Wars_Epis%C3%B3dio_1_Amea%C3%A7a_Fantasma.jpg'} category='Filme' title='Episódio I' subTitle='A Ameaça Fantasma' />

            <View style={styles.areaActions}>

                <View style={styles.areaFavorites}>
                    <MaterialIcons name="add-circle-outline" size={27} color={colors.greyLight} onPress={() => hundleFavorite(films[0])} />
                    <Text style={{ fontFamily: fonts.SemiBold, fontSize: 11, color: colors.greyLight }} onPress={() => hundleFavorite(films[0])}>Favoritos</Text>
                </View>

                <TouchableOpacity activeOpacity={0.6} style={styles.areaWatch} onPress={hundleWatch}>
                    <Ionicons name="ios-play" size={22} color="black" />
                    <Text style={styles.txtWatch}>Assistir</Text>
                </TouchableOpacity>

                <View style={styles.areaInfo}>
                    <MaterialIcons name="info-outline" size={27} color={colors.greyLight} onPress={hundleInfoMain} />
                    <Text style={{ fontFamily: fonts.SemiBold, fontSize: 11, color: colors.greyLight }} onPress={hundleInfoMain}>Saiba mais</Text>
                </View>

            </View>

            <ScrollView>

                <View style={styles.areaCards}>

                    <View style={{ flex: 1, marginBottom: 30 }}>
                        <Text style={{ fontFamily: fonts.Black, fontSize: 20, color: colors.white, marginBottom: 12, marginLeft: 7 }}>Filmes</Text>

                        <FlatList
                            keyExtractor={item => String(item.id)}
                            data={films}
                            renderItem={({ item }) => (
                                <CardFilms image={item.image_url} onPress={() => hundleInfoMoreFilms(item)} />
                            )}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                        />
                    </View>

                    <View style={{ flex: 1, marginBottom: 30 }}>
                        <Text style={{ fontFamily: fonts.Black, fontSize: 20, color: colors.white, marginBottom: 12, marginLeft: 7, }}>Personagens</Text>

                        <FlatList
                            keyExtractor={item => String(item.id)}
                            data={characters}
                            renderItem={({ item }) => (
                                <CardFilms image={item.image_url} onPress={() => hundleInfoMoreCharac(item)} />
                            )}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={{ height: '40%' }}
                        />
                    </View>



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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.dark,
    },

    areaActions: {
        width: '90%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 15,
        marginBottom: 25
    },

    areaFavorites: {
        width: 50,
        height: 40,
        marginRight: 60,
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
        marginRight: 60,
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

    areaCards: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },

});