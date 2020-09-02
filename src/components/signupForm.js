import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

/** Redux */
import { connect } from 'react-redux';
import { addUser } from '../store/actions/lawyer-action';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: { value: '' },
                password: { value: '' },
                name: { value: '' },
                contact: { value: '' },
                address: { value: '' }
            },
        };
    }

    updateInput = (name, text) => {
        let formCopy = this.state.form;

        formCopy[name].value = text;

        this.setState({
            form: formCopy,
        });
    };

    async submitUser(){
        const { form } = this.state;
        let formToSubmit = {};

        let formCopy = form;

        for (let key in formCopy) {
            formToSubmit[key] = formCopy[key].value;
        }

        const { email, password } = formToSubmit;

        if (!email || !password) {
            return alert('Fill all credentials');
        } else {
            return await this.props.addUser(formToSubmit);
        }

    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.email}
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    style={styles.input}
                    placeholder="Enter Email"
                    onChangeText={text => this.updateInput('email', text)}
                />
                <TextInput
                    value={this.state.password}
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Enter Password"
                    onChangeText={text => this.updateInput('password', text)}
                />
                <TextInput
                    value={this.state.name}
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    style={styles.input}
                    placeholder="Enter Name"
                    onChangeText={text => this.updateInput('name', text)}
                />
                <TextInput
                    value={this.state.contact}
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    style={styles.input}
                    placeholder="Enter Contact"
                    keyboardType="phone-pad"
                    onChangeText={text => this.updateInput('contact', text)}
                />
                <TextInput
                    value={this.state.address}
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    style={styles.input}
                    placeholder="Enter Address"
                    onChangeText={text => this.updateInput('address', text)}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.submitUser().then(res => {

                            this.props.signuphandle();
                        })
                    }}
                >
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(null, { addUser })(SignupForm);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginVertical: 10,
        paddingHorizontal: 16,
        borderColor: "black",
        borderRadius: 25,
        fontSize: 16,
        color: "#ffffff"
    },
    button: {
        width: 300,
        backgroundColor: '#000a12',
        marginVertical: 10,
        paddingVertical: 12,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: "#ffffff",
        textAlign: "center"
    }

});