import React, { Component } from 'react';
import { StyleSheet, Animated, Image, View, ActivityIndicator, ToastAndroid } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

/**
 * @images
 */
import Logo from '../images/logo.png';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { getUsers } from '../store/actions/lawyer-action';
import { getPosts } from '../store/actions/post-action';
import { getLawyerPosts } from '../store/actions/job-action';

class AnimateScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      LogoAnime: new Animated.Value(0),
      lSpinner: new Animated.Value(0),

    };
  }

  readData = async () => {
    try {
      const userAge = await AsyncStorage.multiGet(["DATA_KEY", "ID_KEY"]);
      // console.log("Check key", userAge);
      if (userAge !== []) {
        return userAge;
      }
      return null;
    } catch (e) {
      console.log("Animate Screen: Error");
    }
  }

  componentDidMount() {
    const { LogoAnime, lSpinner } = this.state;
    const { navigation, getUsers, getPosts, getLawyerPosts, user } = this.props;

    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 1,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(lSpinner, {
          toValue: 1,
          tension: 10,
          duration: 900,
          useNativeDriver: true,
        }).start(() => {
        });
      }),
    ]).start();

    let next = null;
    let id = null;
    // console.log(user);
    this.readData().then((res) => {
      // console.log("Animate Screen: ", res);
      // id = res[1][1];
      if (res[0][1] === null) {
        console.log("user signin");
        next = "SignIn";
      }

      else {
        console.log("user dashboard");
        next = "drawerApp";
        id = res[1][1];
        console.log("Id at drawerApp is: ", id);
        getUsers({ id: res[1][1] });
        getPosts({ person: "client" });
        getLawyerPosts({ person: "lawyer" });
      }
      // this.props.navigation.navigate(next);
    })
      .then(() => {
        console.log("Next Is: ", next);

        setTimeout(() => {
          // ToastAndroid.show(user.message, ToastAndroid.LONG);
          console.log("Going to next stage");
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: next })],
          });
          navigation.dispatch(resetAction);
        }, 1000);
      });
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    const { LogoAnime, lSpinner } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.logoTop,
            ]}>
            <Image source={Logo} style={{ width: 170, height: 190 }} />
          </Animated.View>


          <Animated.View
            style={[
              styles.Spinner,
            ]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.lawyer,
});

export default connect(mapStateToProps, { getUsers, getPosts, getLawyerPosts })(AnimateScene);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  logoTop: {
    marginBottom: 20,
    marginTop: 120,
    alignItems: 'center',
  },
  Landing: {
    marginTop: 55,
    alignItems: 'center',
  },
  Spinner: {
    marginTop: 50,
    alignItems: 'center',
  },
});
