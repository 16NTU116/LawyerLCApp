import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    ScrollView,
    Image,
    View
} from 'react-native';

class Card extends React.Component {
    render() {
        this.state = {
            elements: [
                {
                    name: 'Imran',
                    detail: 'Divorse case',
                    date: '30/3/12',
                    time: '12:30pm',
                    phoneNo : '03346511238'
                }
            ]
        }
        return (
            <View>
                <Text style = {styles.headingText}>Your meeting will be with :</Text>
            <View style={styles.container}>
                
                <View>
                    <Text style={styles.name}>{this.state.elements[0].name}</Text>
                    <Text style={styles.name}>{this.state.elements[0].detail}</Text>
                    <Text style={styles.name}>{this.state.elements[0].date}</Text>
                    <Text style={styles.name}>{this.state.elements[0].time}</Text>
                </View>
                </View>
            </View>
        );
    }
}

export default Card;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        borderColor: "black",
        padding: 18,
        borderWidth: 1,
        justifyContent : 'center',
        paddingLeft : 20,
        marginBottom: 5,
        width: '90%',
        flexGrow: 1,
        marginLeft : 20,
        padding : -50
    },
    name: {
        fontSize:20,
        color: 'black'
    },
    headingText : {
        fontFamily: 'sans-serif',
        fontSize: 20,
        fontWeight: '900',
        color : 'black',
        marginHorizontal : 70,
    }
});