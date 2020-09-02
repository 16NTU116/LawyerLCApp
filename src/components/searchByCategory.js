import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    ScrollView
} from 'react-native';

import PostStrcture from '../components/postStructure';
import postImage from "../images/logo.png";

// Redux
import { connect } from 'react-redux'

class SearchedByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            message: "No Post Found"
        };
    }

    componentDidMount() {
        const { posts, navigation } = this.props;
        console.log("search posts are: ", posts);

        this.setState(() => ({ post: posts, search: navigation.getParam('search') }));

        console.log(this.state);
    }

    render() {
        return (
            <View style={styles.engine}>
                <StatusBar
                    backgroundColor="#000a12"
                    barStyle="light-content"
                />
                <Text style={styles.text}>
                    Category: {this.state.search}
                </Text>

                <ScrollView>
                    {this.state.post.length > 0 ? 
                    this.state.post.map((value, index) => (
                        <PostStrcture key={index} name={value.name} caseTitle={value.title} caseDetails={value.details} postImage={postImage} />
                    )) : <Text style={styles.text}>{this.state.message}</Text>
                }
                </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => ({
    posts: state.post.categoryPost,
});

export default connect(mapStateToProps)(SearchedByCategory);

const styles = StyleSheet.create({
    engine: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: 'white',
        alignItems: 'center'
    },
    text: {
        marginTop: 30,
        marginBottom: 15,
        fontSize: 30,
        textAlign: 'center'
    }
});
