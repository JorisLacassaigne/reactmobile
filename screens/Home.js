import React from 'react';
import { Text, View } from 'react-native';
import { GlobalStyles } from "../styles/AppStyles";

const Home = () => {
    return (
    <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.title}>Page d'accueil là</Text>
        <Text style={GlobalStyles.text}>Logo, nom entreprise, etc...</Text>
        <Text style={GlobalStyles.text}>
            Nouveautés, promos, quelques produits, etc...
        </Text>
    </View>
    );
}

export default Home;         