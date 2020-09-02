import React from 'react';
import {
    View,
    ScrollView,
    Text,
} from 'react-native';

// Redux
import { connect } from 'react-redux'
import { getPosts } from '../store/actions/chat-action'

// Structures
import Container from '../components/container';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        const { posts, getPosts } = this.props;
        
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Container />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    messages : state.chat.newnewmessges
});

export default connect(mapStateToProps)(Notification);