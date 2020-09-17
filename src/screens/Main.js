import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, View, Keyboard} from 'react-native';
import {Appbar, TextInput, RadioButton, Button, Dialog, Portal, Paragraph} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';

const initialState = {
    lampWidth: '',
    lampLength: '',
    roomWidth: '',
    roomLength: '',
    rows: '1',
    lampsPerRow: '1',
    rowsParalellToLongerWall: 'yes',
    lampsInLine: 'no',
    wallAxis: '1',
    axisAxis: '1',
    wallLamp: '1',
    lampLamp: '1',
}

const {useState, useEffect} = React;

export default function Main(props) {
    const [{
        lampWidth,
        lampLength,
        roomWidth,
        roomLength,
        rows,
        lampsPerRow,
        rowsParalellToLongerWall,
        lampsInLine,
        wallAxis,
        axisAxis,
        wallLamp,
        lampLamp
    }, setState] = useState(initialState)
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [results, setResults] = useState('');
    const clearState = () => {
        setState({...initialState});
    };

    const onChangeDecimal = (name, value) => {
        setState(prevState => ({...prevState, [name]: value.replace(',', '.')}));
    };

    const onChangeInteger = (name, value) => {
        setState(prevState => ({...prevState, [name]: value.replace(/[^0-9]/g, '')}));
    };

    const onChangeString = (name, value) => {
        setState(prevState => ({...prevState, [name]: value}));
    };

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", keyboardDidHide);
        return () => {
            Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
        };
    }, []);

    const keyboardDidShow = () => {
        setIsKeyboardVisible(true)
    };

    const keyboardDidHide = () => {
        setIsKeyboardVisible(false)
    };

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

    const submit = () => {
        setResults('');
        let dialogText = checkInputs();
        if (dialogText) {
            setResults(dialogText);
        } else {
            setResults(computeResults());
        }
        showDialog();
    }

    const computeResults = () => {
        let results = '';
        let LW = parseFloat(lampWidth);
        let LL = parseFloat(lampLength);
        let RW = parseFloat(roomWidth) * 100;
        let RL = parseFloat(roomLength) * 100;
        let R = parseInt(rows);
        let LPR = parseInt(lampsPerRow);
        let LPTLW = rowsParalellToLongerWall === 'yes';
        let LIN = lampsInLine === 'yes';
        let WTA = parseFloat(wallAxis);
        let ATA = parseFloat(axisAxis);
        let WTL = parseFloat(wallLamp);
        let LTL = parseFloat(lampLamp);
        if (!(LW && LL && RW && RL && R && LPR && WTA && ATA && WTL && LTL)) {
            return ("Żaden z parametrów nie może wynosić 0!")
        }
        if (LW > LL) {
            [LW, LL] = [LL, LW];
        }
        if (RW > RL) {
            [RW, RL] = [RL, RW];
        }
        let rowLength, rowPerpendicularLength;
        if (LPTLW) {
            rowLength = RL;
            rowPerpendicularLength = RW;
        } else {
            rowLength = RW;
            rowPerpendicularLength = RL;
        }
        let axisToAxisSum = 2 * WTA + (R - 1) * ATA;
        let axisChunk = rowPerpendicularLength / axisToAxisSum;
        let wallToAxisDistance = (WTA * axisChunk / 100).toFixed(3);
        results += `Ściana - Oś rzędu: ${wallToAxisDistance}m\n`;
        if (R > 1) {
            let axisToAxisDistance = (ATA * axisChunk / 100).toFixed(3);
            results += `Oś rzędu - Oś rzędu:  ${axisToAxisDistance}m\n`;
        }
        let pararellLampSize = LIN ? LL : LW;
        let distanceToDivide = rowLength - pararellLampSize * LPR;
        let lampToLampSum = 2 * WTL + (LPR - 1) * LTL;
        let lampChunk = distanceToDivide / lampToLampSum;
        let wallToLampDistance = (WTL * lampChunk / 100).toFixed(3);
        results += `Ściana - Lampa:  ${wallToLampDistance}m\n`;
        if (LPR > 1) {
            let lampToLampDistance = (LTL * lampChunk / 100).toFixed(3);
            results += `Lampa - Lampa:  ${lampToLampDistance}m\n`;
        }
        return results;
    }
    
    const showDialog = () => setIsDialogVisible(true);
    const hideDialog = () => setIsDialogVisible(false);
    
    return (
      <SafeAreaView style={styles.container}>
          <Appbar.Header style={styles.header}>
              <Appbar.Content title={<Text>M. E. S. A.</Text>} style={styles.title}/>
          </Appbar.Header>
          <Portal>
              <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
                  <Dialog.Title>Wynik:</Dialog.Title>
                  <Dialog.Content>
                      <Paragraph>{results}</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                      <Button onPress={hideDialog}>OK</Button>
                  </Dialog.Actions>
              </Dialog>
          </Portal>
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
                            onChangeText={val => onChangeDecimal("lampWidth", val)}
                          />
                      </View>
                      <View style={styles.inputContainer}>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={lampLength}
                            onChangeText={val => onChangeDecimal("lampLength", val)}
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
                            onChangeText={val => onChangeDecimal("roomWidth", val)}
                          />
                      </View>
                      <View style={styles.inputContainer}>
                          <TextInput
                            keyboardAppearance="dark"
                            mode="outlined"
                            style={styles.input}
                            keyboardType="numeric"
                            value={roomLength}
                            onChangeText={val => onChangeDecimal("roomLength", val)}
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
                            onChangeText={val => onChangeInteger("rows", val)}
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
                            onChangeText={val => onChangeInteger("lampsPerRow", val)}
                          />
                      </View>
                  </View>
                  <Text style={styles.label}>Rzędy względem dłuższej ściany</Text>
                  <RadioButton.Group
                    onValueChange={val => onChangeString("rowsParalellToLongerWall", val)}
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
                    onValueChange={val => onChangeString("lampsInLine", val)}
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
                            onChangeText={val => onChangeDecimal("wallAxis", val)}
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
                            onChangeText={val => onChangeDecimal("axisAxis", val)}
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
                            onChangeText={val => onChangeDecimal("wallLamp", val)}
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
                            onChangeText={val => onChangeDecimal("lampLamp", val)}
                          />
                      </View>
                  </View>
              </ScrollView>
          </View>
          <View style={[styles.buttonContainer, isKeyboardVisible ? {display: 'none'} : null]}>
              <Button style={styles.button} icon="broom" mode="contained" onPress={clearState}>
                  Wyczyść
              </Button>
              <Button style={styles.button} icon="calculator" mode="contained"
                      onPress={submit}>
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    button: {
        width: '40%',
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

