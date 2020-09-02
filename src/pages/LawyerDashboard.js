import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import SearchBar from '../components/searchBar';
import PostStrcture from '../components/postStructure';
import postImage from "../images/logo.png";

// Redux
import { connect } from 'react-redux'
import { getPosts, getAssignedPosts } from '../store/actions/post-action'

class LawyerDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
        };
    }

    navigateToSearch = (searchitem) => {
        setTimeout(() => this.props.navigation.navigate('SearchedPost', { search: searchitem }), 1000);
    }

    navigateToChat = (item) => {
        this.props.navigation.navigate('Chatting', { id: item });
    }

    async componentDidMount() {
        const { user, posts, getPosts, getAssignedPosts } = this.props;
        this.setState(() => ({ post: posts || "Nothing to Show" }));

        getPosts({ person: "client" });
        getAssignedPosts({ id: user._id, person: "client" });
    }

    render() {
        return (
            <View style={styles.engine}>
                <StatusBar
                    backgroundColor="#000a12"
                    barStyle="light-content"
                />
                <SearchBar search={this.navigateToSearch} status="active"  person="client"/>
                <ScrollView>
                    {this.state.post.map((value, index) => (
                        <PostStrcture
                            key={index}
                            caseid={value._id}
                            name={value.name}
                            caseTitle={value.title}
                            caseDetails={value.details}
                            postImage={postImage}
                            showButton={true}
                            navigateToChat={this.navigateToChat} />
                    ))}
                </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => ({
    posts: state.post.posts,
    user: state.user.lawyer,
});

export default connect(mapStateToProps, { getPosts, getAssignedPosts })(LawyerDashBoard);

const styles = StyleSheet.create({
    engine: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: 'white',
        alignItems: 'center'
    },
});
