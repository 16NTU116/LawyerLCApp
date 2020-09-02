import React, { Component, Fragment } from 'react';
import { StyleSheet, Animated, FlatList, Image, YellowBox } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import io from "socket.io-client";
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Content,
  Text,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Footer,
  Title,
  Input,
  Button,
  Header,
} from 'native-base';

/** Images */
import Boy from '../images/boy.png';
import Add from '../images/add.png';
import lego from '../images/lego.png';
import { WEBSITE_URL } from '../store/helpers/misc';
import { TouchableOpacity } from 'react-native-gesture-handler';

/** Chatroom actions */
import {
  // loadMessages,
  // // joinChatroom,
  // // disconnectChatRoom,
  // sendMessage,
} from '../store/actions/chat-action';
// import {logout} from '../../store/actions/authActions';

/** ignore warnings */
YellowBox.ignoreWarnings(['Remote debugger', 'VirtualizedLists']);

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userdetails: '',
      room: 'vendor',
      messages: [],
      msgText: '',
      stickyHeaderIndices: [],
      currentUser: false,
    };
    this.textInput = React.createRef();
    this.flatList = React.createRef();
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.key = navigation.getParam('id');
    console.log(this.key);

    this.socket = io(WEBSITE_URL, { query: `ids=${this.key}`});
    this.socket.on("chat message", msg => {
      if (msg.length > 1) {
        console.log("Message length is: ", msg);
        return this.setState({
          messages: msg
        });
      } 
      console.log("Mesage is:", msg);
      return this.setState({
        messages: [...this.state.messages, msg]
      });
    });

  }

  componentDidUpdate(prev, nextprop) { }

  componentWillUnmount() {
  }

  updateInput = text => this.setState({ msgText: text });

  submitMsg = () => {
    const { user } = this.props;

    let msgToSubmit = {
      name: user.name,
      msg: this.state.msgText,
      id: this.key,
    };

    this.socket.emit('chat message', msgToSubmit);
    this.setState({ msgText: '' });
  };

  renderItem = ({ item }) => {
    if (item.header) {
      // return (
      //   <ListItem itemDivider>
      //     <Left />
      //     <Body style={{marginRight: 40}}>
      //       <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
      //     </Body>
      //     <Right />
      //   </ListItem>
      // );
    } else if (!item.header) {
      return this.state.isFromUser ? null : (
        <ListItem avatar style={styles.chatList}>
          <Fragment>
            {this.state.currentUser === item.name ? (
              <Left style={styles.left}>
                {item.type === 'bot' ? (
                  <Image source={lego} />
                ) : (
                    <Thumbnail
                      source={Boy}
                      style={{ width: 28.95, height: 40.23 }}
                    />
                  )}
              </Left>
            ) : null}
            <Body style={styles.chatBody}>
              <TouchableOpacity>
                <Text note style={styles.chatname}>
                  {item.name}
                </Text>
                <Text style={styles.chatmsg}>{item.msg}</Text>
              </TouchableOpacity>
            </Body>
            {this.state.currentUser !== item.name ? (
              <Right style={styles.right}>
                {item.type === 'bot' ? (
                  <Image source={lego} />
                ) : (
                    <Thumbnail
                      source={Boy}
                      style={{ width: 28.95, height: 40.23 }}
                    />
                  )}
              </Right>
            ) : null}
          </Fragment>
        </ListItem>
      );
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.chatroomHeader}>
          <Left>
            <Button
              transparent
              onPress={() => (this.props.navigation.openDrawer())}>
              <Icons name="bars" color="#000" style={styles.chatHeaderIcons} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#000' }}>Chatroom</Title>
          </Body>
        </Header>
        <Content style={styles.container}>
          {this.state.messages.length > 0 ? (
            <FlatList
              key={this.state.messages.msg}
              ref={ref => (this.flatList = ref)}
              onContentSizeChange={() =>
                this.flatList.scrollToEnd({ animated: true })
              }
              onLayout={() => this.flatList.scrollToEnd({ animated: true })}
              data={this.state.messages}
              renderItem={this.renderItem}
              keyExtractor={item => item.msgid}
            />
          ) : null}
        </Content>
        <Footer style={styles.footer}>
          <Input
            style={styles.Input}
            placeholderTextColor="#2E2D2C"
            placeholder="Type something"
            onChangeText={text => this.updateInput(text)}
            onSubmitEditing={() => this.submitMsg()}
            clearButtonMode={'always'}
            value={this.state.msgText}
            ref={input => {
              this.textInput = input;
            }}
          />

          <Button
            transparent
            onPress={() => (this.submitMsg())}>
            <Icons name="paper-plane" color="#000" size={32} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }} />
          </Button>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.lawyer,
});

export default connect(mapStateToProps)(Chatroom);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
  },
  chatroomHeader: {
    backgroundColor: '#ffffff',
  },
  chatHeaderIcons: {
    fontFamily: 'SF-UI-Display-Bold',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  chatList: {
    marginTop: 10,
    marginBottom: 5,
  },
  chatBody: {
    backgroundColor: '#ffffff',
    borderRadius: 68,
    marginLeft: 22,
    paddingLeft: 30,
  },
  chatname: {
    color: '#95989A',
    marginBottom: 3,
    textTransform: 'capitalize',
    fontFamily: 'SF-UI-Display-Regular',
    fontSize: 12,
  },
  chatmsg: {
    fontFamily: 'SF-UI-Display-Regular',
    fontSize: 16,
    color: '#2E2D2C',
  },
  footer: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 22,
    marginBottom: 16,
    marginLeft: 26,
    paddingLeft: 22,
    paddingTop: 14,
    paddingBottom: 16,
    paddingRight: 22.6,
  },
  Input: {
    fontFamily: 'SF-UI-Display-Regular',
    fontSize: 16,
    color: '#2E2D2C',
    backgroundColor: '#ffffff',
    marginRight: 7,
    borderRadius: 10,
    paddingLeft: 15,
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
  },
});









// import React from 'react';
// import {
//     StyleSheet,
//     ScrollView,
//     View,
//     Text,
//     TextInput,
//     StatusBar,
//     TouchableOpacity
// } from 'react-native';
// import { WEBSITE_URL } from '../store/helpers/misc';
// import io from "socket.io-client";

// class Chatting extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             chatMessage: '',
//             chatMessages: []
//         }
//     }

//     //connecting with socket.io server
//     componentDidMount() {
//         this.socket = io(WEBSITE_URL);
//         this.socket.on('chat message', msg => {
//             this.setState({ chatMessages: [...this.state.chatMessages, msg] })
//         })

//     }

//     submitChatMessage() {
//         this.socket.emit("chat message", this.state.chatMessage);
//         this.setState((prev) => ({ chatMessage: "" }))
//     }

//     render() {
//         const chatMessages = this.state.chatMessages.map((chatMessage, index) => <Text key={index}>{chatMessage}</Text>)

//         return (
//             <View style={styles.container}>
//                 <StatusBar
//                     backgroundColor="#000a12"
//                     barStyle="light-content"
//                 />
//                 {/* <ScrollView> */}

//                 {/* </ScrollView> */}

//                 <TextInput style={styles.textInput}
//                     onSubmitEditing={() => this.submitChatMessage()}
//                     value={this.state.chatMessage}
//                     autoCorrect={false}
//                     onChangeText={chatMessage => {
//                         this.setState({ chatMessage });
//                     }} />
//                 <Text style={{ marginTop: 10, fontSize: 20 }}>
//                     {chatMessages}
//                 </Text>
//             </View>
//         );
//     }
// }

// export default Chatting;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },

//     textInput: {
//         width: '80%',
//         height: 40,
//         borderWidth: 1,
//         // position: 'absolute',
//         // bottom: 5,
//         justifyContent: 'flex-end',
//         borderRadius: 10,
//         marginLeft: 5,
//         flexDirection: 'row'
//     },
//     sendButton: {
//         marginLeft: 30
//     }
// })