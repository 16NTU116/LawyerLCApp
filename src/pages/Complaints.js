import React from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Text,
    Alert,
    Button
} from 'react-native';

import { connect } from 'react-redux';
import { PostComplaint } from '../store/actions/complain-action';
// import AsyncStorage from '@react-native-community/async-storage';

class Complaints extends React.Component {
    state = {
        complaints: { value: '' },
    }

    updateInput = (text) => {
        let complain = this.state.complaints;

        complain.value = text;

        this.setState({
            complaints: complain,
        });
    };

    submitUser = async() => {
        const { complaints } = this.state;
        const { user, PostComplaint } = this.props;
        console.log("User id: ", user._id);
        // const userid = await AsyncStorage.getItem('ID_KEY');
        const complaint = {
            complaints: complaints.value,
            id: user._id
        }

        const { value } = this.state.complaints;

        if (!value) {
            return alert('Fill Compleints');
        } else {
            console.log(complaint)
            return await PostComplaint(complaint);
        }
    };

    onSubmitHandler = () => {
        Alert.alert(
            'Congratulations!!',
            'Your complain submitted successfully', // <- this part is optional, you can pass an empty string
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Dashboard')},
            ],
            { cancelable: false },
        );
    }

    render() {
        // onChangeHandler = (event) => (this.setState(() => ({ complaintBox: event })));

        return (
            <View style={styles.container}>
                <Text style={styles.headingText}>
                    Submit your Feedback here!!
                </Text>
                <TextInput
                    value={this.state.complaints}
                    style={styles.input}
                    placeholder="Enter your Feedback"
                    onChangeText={this.onChangeHandler}
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={text => this.updateInput(text)}
                />
                <TouchableOpacity style={styles.button}>
                    <Text
                        onPress={
                            () => {
                                this.submitUser().then(() => {
                                    this.onSubmitHandler();
                                }
                                )
                            }
                        }
                        style={styles.buttonText}

                    >
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.lawyer,
});

export default connect(mapStateToProps, { PostComplaint })(Complaints);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headingText: {
        fontFamily: 'sans-serif',
        fontSize: 25,
        fontWeight: '900',
        color: 'black'
    },
    input: {
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 1.8)',
        marginVertical: 10,
        paddingHorizontal: 16,
        borderColor: "#303331",
        borderRadius: 25,
        fontSize: 16,
        borderWidth: 1,
        textAlignVertical: "top"
    },
    button: {
        width: 190,
        backgroundColor: "#263238",
        marginVertical: 15,
        paddingVertical: 12,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: "white",
        textAlign: "center"
    },
});