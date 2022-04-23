import React, { useState } from 'react';

import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import colors from '../styles/colors';

import fonts from '../styles/fonts';

import logoEmpire from '../assets/logoEmpire.png';

import logoStorm from '../assets/logoStorm.png';
import { CardFilms } from '../components/CardFilms';
import { useEffect } from 'react';
import api from '../services/api';

import { FontAwesome } from '@expo/vector-icons';

export const Seacrh = () => {

    const Navigation = useNavigation();

    const [resulSearch, setResulSearch] = useState({});

    const [noResult, setNoResult] = useState(false);

    const [valueInput, setValueinput] = useState('');

    const [searchMode, setSearchMode] = useState(false);

    const [sugestionFilm, setSugestionFilm] = useState({});

    useEffect(() => {

        const defaultStates = () => {
            setValueinput('');
        };

        const getSugestions = async () => {

            const sugFilms = await api.get('/filmes');

            setSugestionFilm(sugFilms.data.filter(film => film.id < 5));
        };

        defaultStates();
        getSugestions();

    }, []);

    const hundleInfoMoreFilms = (item) => {
        Navigation.navigate('InfoMore', {
            category: 'Filme',
            image_url: `${item.image_url}`,
            title: item.title,
            subTitle: item.subtitle,
            watch: true,
            description: item.description
        });
    };

    const hundleInfoMoreCharac = (item) => {
        Navigation.navigate('InfoMore', {
            category: 'Personagem',
            image_url: `${item.image_url}`,
            title: item.title,
            subTitle: item.subtitle,
            watch: false,
            description: item.description
        });
    };

    const hundleInputChange = (text) => {
        setValueinput(text);

        if (text === '') {
            setNoResult(false);
            setResulSearch(false);
            setSearchMode(false);
        };
    }


    const getSearch = async () => {

        setSearchMode(true);

        const dataFilms = await api.get('/filmes');

        const filterFilmes = dataFilms.data;

        const result = filterFilmes.filter(filme => filme.title == valueInput);

        if ((valueInput != '') && Object.keys(result).length) {
            setNoResult(false);
            setResulSearch(result);
        } else if ((valueInput != '') && !Object.keys(result).length) {
            setNoResult(true);

            const dataCharacters = await api.get('/personagens');

            const filterCharacters = dataCharacters.data;

            const result = filterCharacters.filter(charac => charac.title == valueInput);

            if ((valueInput != '') && Object.keys(result).length) {
                setNoResult(false);
                setResulSearch(result);
            } else if ((valueInput != '') && !Object.keys(result).length) {
                setNoResult(true);

            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <Image source={logoEmpire} />
                <Text style={styles.title}>Pesquisar</Text>
            </View>



            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <TextInput value={valueInput} onChangeText={(text) => hundleInputChange(text)} placeholder='Nome do Filme ou Personagem' placeholderTextColor='rgba(255,255,255,0.4)' style={styles.InputSearch} />

                <View style={{ width: 50, height: 50, top: '3%', right: '70%', justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="search" size={24} color={colors.greyLight} onPress={getSearch} style={{ padding: '15%' }} />
                </View>

            </View>


            {
                valueInput != '' ? <Text style={styles.txtResult}>Resultados</Text> : <Text style={styles.txtResult}>Sugestões</Text>
            }

            <KeyboardAvoidingView style={{ height: 700 }}>

                {valueInput === '' &&
                    <View style={{ width: '110%' }}>
                        <FlatList
                            keyExtractor={item => String(item.id)}
                            data={sugestionFilm}
                            renderItem={({ item }) => (
                                <CardFilms image={item.image_url} onPress={() => hundleInfoMoreFilms(item)} />
                            )}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={{ marginBottom: 10 }}
                        />
                    </View>
                }

            </KeyboardAvoidingView>


            {
                noResult && (
                    <View style={styles.noResultArea}>
                        <Image source={logoStorm} />
                        <Text style={styles.txtNoResult}>Nenhum Resultado {'\n'} Encontrado</Text>
                    </View>
                )
            }


            {
                searchMode && (

                    <View style={{ position: 'absolute', width: '110%', marginTop: '85%', height: 200 }}>
                        <FlatList
                            keyExtractor={item => String(item.id)}
                            data={resulSearch}
                            renderItem={({ item }) => (
                                <CardFilms image={item.image_url} onPress={() => hundleInfoMoreCharac(item)} />
                            )}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                        />
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
        paddingHorizontal: 30
    },

    title: {
        fontFamily: fonts.Bold,
        color: colors.white,
        fontSize: 30,
        marginLeft: 12
    },

    InputSearch: {
        width: '100%',
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.greyLight,
        marginTop: 25,
        color: colors.white,
        paddingHorizontal: 12
    },

    txtResult: {
        fontFamily: fonts.Black,
        fontSize: 21,
        color: colors.white,
        width: '100%',
        marginTop: 40,
        marginBottom: '10%',
    },

    noResultArea: {
        bottom: '90%',
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

    defaultArea: {
        bottom: '35%',
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})