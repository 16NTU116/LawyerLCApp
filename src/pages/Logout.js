import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";

/** Actions */
import AsyncStorage from '@react-native-community/async-storage';

class Logout extends React.Component {
  async removeItemValue() {
    try {
      const items = ["DATA_KEY", "ID_KEY"];
      await AsyncStorage.multiRemove(items, () => console.log("key Removed"));
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  createTwoButtonAlert = () =>
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        {
          text: "Yes",
          onPress: () => this.removeItemValue().then(res => {
            if (res)
              {
                this.props.navigateToScreen('SignIn');
            }
          }),
          style: "cancel"
        },
        {
          text: "No",
        }
      ],
      { cancelable: false }
    );

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ backgroundColor: '#fff', paddingBottom:'5%',  paddingTop:"5%", paddingLeft: "12%", paddingRight: "12%", borderRadius: 5, marginTop: "5%" }}
          onPress={this.createTwoButtonAlert} >
          <Text>
            Logout
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
