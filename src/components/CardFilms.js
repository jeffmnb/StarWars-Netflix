import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export const CardFilms = ({ image, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: image }} style={styles.container} />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 115,
        height: 166,
        borderRadius: 6,
        marginHorizontal: 7,
        marginBottom: 15
    }
});