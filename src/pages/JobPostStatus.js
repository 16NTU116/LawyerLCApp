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
import { getLawyerPosts, getMyPosts } from '../store/actions/job-action'

class AssignedCase extends Component {
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
        const { user, posts, getLawyerPosts, getMyPosts } = this.props;
        console.log("Data Get from Server: ", posts)
        this.setState(() => ({ post: posts || "Nothing to Show" }));

        const item = { id: user._id, person: "lawyer" };
        getLawyerPosts(item);
        getMyPosts(item);
    }

    render() {
        return (
            <View style={styles.engine}>
                <StatusBar
                    backgroundColor="#000a12"
                    barStyle="light-content"
                />
                <SearchBar search={this.navigateToSearch} status="active" person="lawyer" />
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
    posts: state.job.lpost,
    user: state.user.lawyer,
});

export default connect(mapStateToProps, { getLawyerPosts, getMyPosts })(AssignedCase);

const styles = StyleSheet.create({
    engine: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: 'white',
        alignItems: 'center'
    },
});
