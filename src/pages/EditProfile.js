import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Logo from '../components/logo';
import EditProfileForm from '../components/editProfileForm';

class SignupPage extends Component {

  addClients = () => {
    this.props.navigation.navigate("Dashboard");
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.engine}>
          <StatusBar
            backgroundColor="#000a12"
            barStyle="light-content"
          />
          <Logo />
          <EditProfileForm addClients={this.addClients} />
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
