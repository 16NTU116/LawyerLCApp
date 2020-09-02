import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

/** Redux */
import { connect } from 'react-redux';
import { searchCategoryPosts } from '../store/actions/post-action';

class Categories extends React.Component {

    async getResults(value) {
        const { searchCategoryPosts } = this.props;


        return await searchCategoryPosts({type: value});

    }

    next= (searchitem) => {
        setTimeout(() => this.props.navigation.navigate('SearchedCategoryPost', { search: searchitem }), 1000);
    }

    render() {
        return (
            <View style={styles.container}>

                <View>
                    <Text style={styles.headingText}>
                        Lawyer's Categories
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.getResults("Criminal").then(() => (this.next("Criminal"))
                    )}
                >
                    <Text style={styles.buttonText}>Criminal Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.getResults("Marriage").then(() => (this.next("Criminal"))
                    )}
                >
                    <Text style={styles.buttonText}>Marriage Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.getResults("Divorce").then(() => (this.next("Criminal"))
                    )}
                >
                    <Text style={styles.buttonText}>Divorce Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.getResults("Consultant").then(() => (this.next("Criminal"))
                    )}
                >
                    <Text style={styles.buttonText}>Consultant Lawyer</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default connect(null, { searchCategoryPosts })(Categories);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#263238",
    },
    headingText: {
        fontFamily: 'sans-serif',
        fontSize: 30,
        fontWeight: '900',
        color: 'white'
    },
    button: {
        width: 190,
        backgroundColor: '#d3dce8',
        marginVertical: 15,
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