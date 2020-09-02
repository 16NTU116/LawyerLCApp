import React, { Component } from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';

import logo from "../images/logo.png"

  class LogoTitle extends Component {
      render() {
          return(
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={{ width: 170, height: 190}}
                />
                { this.props.logoText &&
                <Text style={styles.logoText}>
                    {this.props.logoText}
                </Text>
              }
            </View>
          )
      }
  }

  export default LogoTitle;

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: "flex-end",
      alignItems: "center"
    },
    logoText: {
        marginVertical : 15,
        fontSize: 18,
        color: "rgba(255, 255, 255, 0.7)"
    }
  });