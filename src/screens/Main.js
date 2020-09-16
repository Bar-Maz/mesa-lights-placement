import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function Main() {
    const [lampWidth, setLampWidth] = React.useState(0);
    const [lampLength, setLampLength] = React.useState(0);
    const [roomWidth, setRoomWidth] = React.useState(0);
    const [roomLength, setRoomLength] = React.useState(0);
    const [rows, setRows] = React.useState(0);
    const [lampsPerRow, setLampsPerRow] = React.useState(0);
    const [rowsParalellToLongerWall, setRowsParalellToLongerWall] = React.useState(true);
    const [lampsInLine, setLampsInLine] = React.useState(false);
    return (
      <SafeAreaView style={styles.container}>
          <Appbar.Header style={styles.header}>
              <Appbar.Content title={<Text>M. E. S. A.</Text>} style={styles.title}/>
          </Appbar.Header>
          <ScrollView>

          </ScrollView>
          <StatusBar style="light" />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        width: '100%',
    },
    title: {
        alignItems: 'center',
    }
});

