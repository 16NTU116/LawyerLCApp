import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

/** Redux */
import { connect } from 'react-redux';
import { UpdateUser } from '../store/actions/lawyer-action';
import AsyncStorage from '@react-native-community/async-storage';

class EditProfileForm extends Component {
    state = {
        client: {
            email: { value: '' },
            password: { value: "sam" },
            name: { value: '' },
            contact: { value: '' },
            address: { value: '' },
            about: { value: '' }
        },
    }

    componentDidMount() {
        const { user } = this.props;
        this.setState(() => ({
            client: {
                name: { value: user.name },
                email: { value: user.email },
                password: { value: "sam" },
                contact: { value: user.contact },
                address: { value: user.address },
                about: { value: user.about || "" }
            }
        }));
    }

    updateInput = (name, text) => {
        let clientCopy = this.state.client;
        clientCopy
        clientCopy[name].value = text;

        this.setState({
            client: clientCopy,
        });
    };

    submitUser = async () => {
        const { client } = this.state;
        let formToSubmit = {};

        let formCopy = client;

        for (let key in formCopy) {
            formToSubmit[key] = formCopy[key].value;
        }

        const { email, name, contact, address } = formToSubmit;

        if (!email || !name || !contact || !address) {
            return alert('Fill all credentials');
        } else {
            const id = await AsyncStorage.getItem('ID_KEY');
            await this.props.UpdateUser(formToSubmit, id);
        }

    };

    render() {
        // const myIcon = <FontAwesome name="pencil" size={30} color="#900" />;
        return (
            <View style={styles.container}>
                    <View style={styles.section}>
                        <FontAwesome name="pencil" size={20} color="#000"/>
                        <TextInput
                            value={this.state.client.name.value}
                            underlineColorAndroid='rgba(0, 0, 0, 0)'
                            style={styles.input}
                            placeholder="Enter Name"
                            onChangeText={text => this.updateInput("name", text)}
                        />
                    </View>
                    <TextInput
                        value={this.state.client.email.value}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        placeholder="Enter Email"
                        onChangeText={text => this.updateInput("email", text)}
                    />
                    <TextInput
                        // value={this.state.client.password.value}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder="Enter Password"
                    // onChangeText={text => this.updateInput("password", text)}
                    />
                    <TextInput
                        value={this.state.client.contact.value}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        placeholder="Enter Contact"
                        keyboardType="phone-pad"
                        onChangeText={text => this.updateInput("contact", text)}
                    />
                    <TextInput
                        value={this.state.client.address.value}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        placeholder="Enter Address"
                        onChangeText={text => this.updateInput("address", text)}
                    />

                    <TextInput
                        value={this.state.client.about.value}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        placeholder="About You"
                        onChangeText={text => this.updateInput("about", text)}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.submitUser().then(() => {
                            this.props.addClients()
                        })
                        }
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.lawyer,
});

export default connect(mapStateToProps, { UpdateUser })(EditProfileForm);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        // flex: 1,
        width: 300,
        backgroundColor: '#d3dce8',
        marginVertical: 10,
        paddingHorizontal: 16,
        borderColor: "black",
        borderRadius: 25,
        fontSize: 16,
        color: "#ffffff"
    },
    button: {
        width: 150,
        backgroundColor: '#d3dce8',
        marginVertical: 10,
        paddingVertical: 12,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: "black",
        textAlign: "center"
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        
    },

});