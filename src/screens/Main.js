import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';

export default Main = () => (
    <SafeAreaView>
        <Appbar.Header>
            <Appbar.Content title="Title" subtitle="Subtitle" />
        </Appbar.Header>
        <Text>M.E.S.A.</Text>
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});