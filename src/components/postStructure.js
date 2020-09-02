import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

class SearchBar extends Component {
    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.name}>{this.props.name}</Text>
                <Text style={styles.title}>{this.props.caseTitle}</Text>
                <Text style={styles.details}>{this.props.caseDetails}</Text>
                {
                    this.props.postImage &&
                    <Image
                        source={this.props.postImage}
                        style={{ width:300, height: 200}}
                    />
                }
                <View style={styles.innerView}>
                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={() => this.props.navigateToChat(this.props.caseid)}
                    >
                        <Text style={styles.chatButtonText}>Chat</Text>
                    </TouchableOpacity>
                    {this.props.showButton ? 
                    <TouchableOpacity
                        style={styles.orderButton}
                        onPress={() => this.props.navigateToChat(this.props.caseid)}
                    >
                        <Text style={styles.chatButtonText}>Order</Text>
                    </TouchableOpacity> : null}
                </View>
            </View>

        )
    }
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "flex-end",
        borderColor: "black",
        padding: 18,
        borderWidth: 1,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderBottomStartRadius: 8,
        borderBottomEndRadius: 8,
        borderBottomColor: "#fff",
        marginBottom: 5,
    },
    name: {
        textAlign: "left",
        fontSize: 16,
        fontWeight: "700"
    },
    title: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 14,
    },
    details: {
        textAlign: "left",
        fontSize: 12,
    },
    innerView: {
        flexDirection: 'row',
        marginBottom: -5
    },
    chatButton: {
        flex: 1,
        backgroundColor: '#D3D3D3',
        padding: 5,
        marginStart: -18,
        marginEnd: -18,
        marginBottom: -12,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
    },
    orderButton: {
        flex: 1,
        backgroundColor: '#D3D3D3',
        padding: 5,
        marginStart: -18,
        marginEnd: -18,
        marginBottom: -12,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
        borderStartColor: '#000'
    },
    chatButtonText: {
        textAlign: 'center',
        fontSize: 20
    }
});