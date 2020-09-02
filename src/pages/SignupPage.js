import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
import Logo from '../components/logo';
import SignupForm from '../components/signupForm';

class SignupPage extends Component {

  // addClients = () => {
  //   this.props.navigation.navigate("SignIn");
  // }

  signuphandle = () => {
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.engine}>
          <StatusBar
            backgroundColor="#000a12"
            barStyle="light-content"
          />
          <Logo logoText = "Welcome To Client Portal" />
          <SignupForm signuphandle={this.signuphandle}/>
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Already have an account </Text>
            <Text style={styles.signupButton} onPress={() => this.props.navigation.navigate('SignIn')}>Sign in</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  engine: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#263238",
    alignItems: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 16,
    flexDirection: "row"
  },
  signupText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16
  },
  signupButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: '500'
  }
});

// const mapStateToProps = state => ({
//   clients: state.clientsData.clients,
// });

export default (SignupPage);
