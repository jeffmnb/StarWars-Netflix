import React, { useEffect, useState } from 'react';

import { Button, StyleSheet, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import YoutubePlayer from 'react-native-youtube-iframe';
import { useCallback } from 'react';
import colors from '../styles/colors';

import { Ionicons } from '@expo/vector-icons';

export const WatchScreen = () => {

    const Route = useRoute();
    const data = Route.params;

    const Navigation = useNavigation();

    const [link, setLink] = useState(data);

    const getIdLink = () =>{
        console.log(data);

        let linkFull = data;

        const linkId = linkFull.split('https://www.youtube.com/watch?v=');

        setLink(linkId[1]);
    };

    useEffect(()=>{
        getIdLink();
    },[]);

    return (
        <View style={styles.container}>

            <View style={{ width: 50, height: 50, position: 'absolute', top: '7%', left: '5%' }}>
                <Ionicons name="chevron-back" size={35} color={colors.white} onPress={() => Navigation.goBack()} />
            </View>

            <YoutubePlayer
                height={'30%'}
                videoId={link}
            />
        </View>

    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.dark
    }
})