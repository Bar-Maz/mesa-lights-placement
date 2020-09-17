import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, View} from 'react-native';
import {Appbar, TextInput, RadioButton, Button} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';

export default function Main(props) {
    const [lampWidth, setLampWidth] = React.useState('');
    const [lampLength, setLampLength] = React.useState('');
    const [roomWidth, setRoomWidth] = React.useState('');
    const [roomLength, setRoomLength] = React.useState('');
    const [rows, setRows] = React.useState('1');
    const [lampsPerRow, setLampsPerRow] = React.useState('1');
    const [rowsParalellToLongerWall, setRowsParalellToLongerWall] = React.useState('yes');
    const [lampsInLine, setLampsInLine] = React.useState('no');
    const [wallAxis, setWallAxis] = React.useState('1');
    const [axisAxis, setAxisAxis] = React.useState('1');
    const [wallLamp, setWallLamp] = React.useState('1');
    const [lampLamp, setLampLamp] = React.useState('1');
    const [results, setResults] = React.useState({
        "wallToAxis": 0,
        "axisToAxis": 0,
        "wallToLamp": 0,
        "lampToLamp": 0,
    });

    const checkInputs = () => {
        let warningText = '';
        if (!lampLength.match(/^(0|[1-9]\d*)(\.\d+)?$/) || !lampWidth.match(/^(0|[1-9]\d*)(\.\d+)?$/)) {
            warningText += "Nieprawidłowy wymiar lampy!\n"
        }
        if (!roomLength.match(/^(0|[1-9]\d*)(\.\d+)?$/) || !roomWidth.match(/^(0|[1-9]\d*)(\.\d+)?$/)) {
            warningText += "Nieprawidłowy wymiar pomieszczenia!\n"
        }
        if (!rows.match(/^(0|[1-9]\d*)$/)) {
            warningText += "Nieprawidłowa ilość rzędów!\n"
        }
        if (!lampsPerRow.match(/^(0|[1-9]\d*)$/)) {
            warningText += "Nieprawidłowa ilość lamp w rzędzie!\n"
        }
        if (!wallAxis.match(/^(0|[1-9]\d*)(\.\d+)?$/) || !axisAxis.match(/^(0|[1-9]\d*)(\.\d+)?$/) ||
          !wallLamp.match(/^(0|[1-9]\d*)(\.\d+)?$/) || !lampLamp.match(/^(0|[1-9]\d*)(\.\d+)?$/)) {
            warningText += "Nieprawidłowe proporcje!\n"
        }

        return warningText;
    }

    return (
      <SafeAreaView style={styles.container}>
          <Appbar.Header style={styles.header}>
              <Appbar.Content title={<Text>M. E. S. A.</Text>} style={styles.title}/>
          </Appbar.Header>
          <View style={styles.scrollContainer}>
              <ScrollView style={styles.scroll}>
                  <Text style={styles.label}>Wymiary lampy (cm)</Text>
                  <View style={styles.row}>
                      <View style={styles.inputContainer}>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={lampWidth}
                            onChangeText={val => setLampWidth(val.replace(',', '.'))}
                          />
                      </View>
                      <View style={styles.inputContainer}>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={lampLength}
                            onChangeText={val => setLampLength(val.replace(',', '.'))}
                          />
                      </View>
                  </View>
                  <Text style={styles.label}>Wymiary pomieszczenia (m)</Text>
                  <View style={styles.row}>
                      <View style={styles.inputContainer}>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={roomWidth}
                            onChangeText={val => setRoomWidth(val.replace(',', '.'))}
                          />
                      </View>
                      <View style={styles.inputContainer}>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={roomLength}
                            onChangeText={val => setRoomLength(val.replace(',', '.'))}
                          />
                      </View>
                  </View>
                  <View style={styles.row}>
                      <View style={styles.inputContainer}>
                          <Text style={styles.label}>Ilość rzędów</Text>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={rows}
                            onChangeText={val => setRows(val.replace(/[^0-9]/g, ''))}
                          />
                      </View>
                      <View style={styles.inputContainer}>
                          <Text style={styles.label}>Ilość lamp w rzędzie</Text>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={lampsPerRow}
                            onChangeText={val => setLampsPerRow(val.replace(/[^0-9]/g, ''))}
                          />
                      </View>
                  </View>
                  <Text style={styles.label}>Rzędy względem dłuższej ściany</Text>
                  <RadioButton.Group
                    onValueChange={val => setRowsParalellToLongerWall(val)}
                    value={rowsParalellToLongerWall}>
                      <View style={styles.row}>
                          <View style={styles.radioContainer}>
                              <Text>Równolegle</Text>
                              <RadioButton value="yes" color={props.theme.colors.primary}/>
                          </View>
                          <View style={styles.radioContainer}>
                              <Text>Prostopadle</Text>
                              <RadioButton value="no" color={props.theme.colors.primary}/>
                          </View>
                      </View>
                  </RadioButton.Group>
                  <Text style={styles.label}>Lampy w rzędzie</Text>
                  <RadioButton.Group
                    onValueChange={val => setLampsInLine(val)}
                    value={lampsInLine}>
                      <View style={styles.row}>
                          <View style={styles.radioContainer}>
                              <Text>W linii</Text>
                              <RadioButton value="yes" color={props.theme.colors.primary}/>
                          </View>
                          <View style={styles.radioContainer}>
                              <Text>Równolegle</Text>
                              <RadioButton value="no" color={props.theme.colors.primary}/>
                          </View>
                      </View>
                  </RadioButton.Group>
                  <Text style={styles.label}>PROPORCJE:</Text>
                  <View style={styles.row}>
                      <View style={styles.inputContainer}>
                          <Text style={styles.label}>Ściana - Oś rzędu</Text>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={wallAxis}
                            onChangeText={val => setWallAxis(val.replace(',', '.'))}
                          />
                      </View>
                      <View style={styles.inputContainer}>
                          <Text style={styles.label}>Oś rzędu - Oś rzędu</Text>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={axisAxis}
                            onChangeText={val => setAxisAxis(val.replace(',', '.'))}
                          />
                      </View>
                  </View>
                  <View style={styles.row}>
                      <View style={styles.inputContainer}>
                          <Text style={styles.label}>Ściana - Lampa</Text>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={wallLamp}
                            onChangeText={val => setWallLamp(val.replace(',', '.'))}
                          />
                      </View>
                      <View style={styles.inputContainer}>
                          <Text style={styles.label}>Lampa - Lampa</Text>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={lampLamp}
                            onChangeText={val => setLampLamp(val.replace(',', '.'))}
                          />
                      </View>
                  </View>
              </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
              <Button icon="calculator" mode="contained" onPress={() => console.log('Pressed')}>
                  Oblicz
              </Button>
          </View>
          <StatusBar style="light"/>
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
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
    },
    input: {
        width: '100%',
        height: 30
    },
    inputContainer: {
        width: '40%',
    },
    scrollContainer: {
        flex: 9
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        width: '100%',
    },
    label: {
        width: '100%',
        textAlign: 'center',
        marginTop: 10,
    }
});

