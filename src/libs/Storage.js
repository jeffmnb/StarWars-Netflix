import AsyncStorage from "@react-native-async-storage/async-storage";


export const loadFavorites = async () => {

    const data = await AsyncStorage.getItem('@starwars:favorites');

    let result = data ? JSON.parse(data) : [];

    return result;
};


export const saveFavorite = async (item) => {

    let favoritesStored = await loadFavorites();

    const favoriteExist = favoritesStored.some(favorite => favorite.title === item.title);

    if (favoriteExist) {
        return console.log('Este item já esta como favorito !');
    };

    favoritesStored.push(item);

    await AsyncStorage.setItem('@starwars:favorites', JSON.stringify(favoritesStored));

    console.log('Salvo em favoritos com sucesso!');

};


export const deleteFavorite = async (item) => {
    let favorites = await loadFavorites();

    const result = favorites.filter(any => any.id !== item.id);

    await AsyncStorage.setItem('@starwars:favorites', JSON.stringify(result));

    console.log('Deletado com sucesso!');

};
