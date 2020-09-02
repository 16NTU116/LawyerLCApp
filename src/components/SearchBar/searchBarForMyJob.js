import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

/** Redux */
import { connect } from 'react-redux';
import { searchPosts } from '../../store/actions/job-action';

class MySearchBar extends Component {

    state = {
        form: {
            search: { value: '' },
        },
        search: ''
    }

    updateInput = (text) => {
        this.setState({
            form: {
                search: {
                    value: text
                }
            },
            search: text
        });
    };

    async submitUser() {
        const { form } = this.state;
        const { searchPosts, person, id } = this.props;

        let formToSubmit = {};

        let formCopy = form;

        formToSubmit['search'] = formCopy['search'].value;
        formToSubmit['id'] = id;

        const { search } = formToSubmit;

        if (!search) {
            ToastAndroid.show('Fill all credentials', ToastAndroid.LONG);
            return search;
        } else {
            console.log("Send to: ", formToSubmit)
            return await searchPosts(formToSubmit);
        }
    }

    render() {

        return (
            <View style={styles.container}>

                <TextInput
                    value={this.state.search}
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    style={styles.input}
                    placeholder="Search Discription"
                    onChangeText={text => this.updateInput(text)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.submitUser().then(res => {
                        console.log("Response is: ", res);
                        this.setState(() => ({ form: { search: { value: '' } } }));
                        if (res != '')
                            this.props.search(this.state.form.search.value);
                    })}
                >
                    <Text style={{ color: "white", justifyContent: "center", textAlign: "center" }}>Search</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(null, { searchPosts })(MySearchBar);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    input: {
        width: 250,
        height: 45,
        backgroundColor: '#d3d3d3',
        marginVertical: 10,
        paddingHorizontal: 16,
        borderColor: "black",
        borderRadius: 30,
        borderColor: "black",
        fontSize: 16,
    },
    button: {
        width: 80,
        height: 45,
        backgroundColor: "#263238",
        marginVertical: 10,
        padding: 10,
        borderRadius: 30,
    },
});