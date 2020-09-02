import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

/** Actions */
import { LoginUser } from '../store/actions/lawyer-action';

class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: { value: '' },
                password: { value: '' },
            },
        };
    }

    updateInput = (name, text) => {
        let formCopy = this.state.form;
    
        formCopy[name].value = text;
        // return alert(name, text);
        this.setState({
          form: formCopy,
        });
      };
    
      submitUser = async() => {
        const { form } = this.state;
        let formToSubmit = {};
        // let that = this;

        let formCopy = form;

        for (let key in formCopy) {
            formToSubmit[key] = formCopy[key].value;
        }

        const { email, password } = formToSubmit;

        if (!email || !password) {
            alert('Fill all credentials');
            return false;
        } else {
            console.log('Fill credentials');
            return await this.props.LoginUser(formToSubmit);
        }
    };

    // onChangeHandler1 = (event) => (this.setState(() => ({ username: event })));
    // onChangeHandler2 = (event) => (this.setState(() => ({ password: event })));

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.username}
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    style={styles.input}
                    placeholder="Enter Username"
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={
                        () => {
                            this.submitUser().then(res => {
                                console.log("Response is: ", res);
                                // if(res)
                                    this.props.signinhandle();
                            })
                            
                        }
                    }
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
  });
  
export default connect(mapStateToProps, { LoginUser })(SigninForm);

const styles = StyleSheet.create({
    container: {

        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: 300,
        backgroundColor: '#d3dce8',
        marginVertical: 10,
        paddingHorizontal: 16,
        borderColor: "black",
        borderRadius: 25,
        fontSize: 16,
        color: "black"
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
    }

});