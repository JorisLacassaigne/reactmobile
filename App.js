import {StyleSheet, Text, View} from 'react-native';
import Navigation from "./components/Navigation";
import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_900Black,
} from "@expo-google-fonts/inter";


// Permet de laisser en place le splash screen pendant le chargement
SplashScreen.preventAutoHideAsync();


export default function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                /* Chargement des font*/
                await Font.loadAsync({Inter_400Regular, Inter_600SemiBold, Inter_900Black});
            } catch (e) {
                console.warn(e);
            } finally {
                /* Si les polices sont chargées, on cache le splashscreen */
                setIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isReady) {
            await SplashScreen.hideAsync();
        }
    }, [isReady]);

    return (
        <View onLayout={onLayoutRootView} style={{flex: 1}}>
            <Navigation/>
        </View>
    );
}


// npm install
// npx expo install expo-font
// npx expo install @expo-google-fonts/inter
// npx expo install expo-splash-screen