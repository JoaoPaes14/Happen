import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const LoadingScreen = ({ navigation }: any) => {
   
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
       
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

       
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 6000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.loadingDots}>
                <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
                <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
                <Animated.View style={[styles.dot, { opacity: fadeAnim }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BFFFC5', 
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    loadingDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    dot: {
        width: 12,
        height: 12,
        backgroundColor: '#000',
        borderRadius: 6,
        marginHorizontal: 5,
    },
});

export default LoadingScreen;
