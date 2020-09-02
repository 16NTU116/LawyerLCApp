import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    ScrollView
} from 'react-native';

import SearchBar from '../components/SearchBar/searchBarForMyJob';
import PostStrcture from '../components/postStructure';
import postImage from "../images/Anpost.jpg";

// Redux
import { connect } from 'react-redux'
import { getMyPosts } from '../store/actions/job-action'

class MyJobStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            userId: ''
        };
    }

    navigateToSearch = (searchitem) => {
        setTimeout(() => this.props.navigation.navigate('SearchedPost', { search: searchitem }), 1000);
    }

    navigateToChat = (item) => {
        this.props.navigation.navigate('Chatting', { id: item });
    }

    async componentDidMount() {
        const { user, posts, getMyPosts } = this.props;
        
        this.setState(() => ({ post: posts, userId: user._id }));

        const item = { id: user._id };
        getMyPosts(item);
    }

    render() {
        return (
            <View style={styles.engine}>
                <StatusBar
                    backgroundColor="#000a12"
                    barStyle="light-content"
                />
                <SearchBar search={this.navigateToSearch} id={this.state.userId} />
                <ScrollView>
                    {this.state.post.map((value, index) => (
                        <PostStrcture key={index} 
                        caseid={value._id} 
                        name={value.name} 
                        caseTitle={value.title} 
                        caseDetails={value.details} 
                        postImage={postImage} 
                        navigateToChat={this.navigateToChat}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => ({
    posts: state.job.myPosts,
    user: state.user.lawyer,
});

export default connect(mapStateToProps, { getMyPosts })(MyJobStatus);

const styles = StyleSheet.create({
    engine: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: 'white',
        alignItems: 'center'
    },
});
