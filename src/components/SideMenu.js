import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Logout from '../pages/Logout';

import Logo from "../images/logo.png"

class SideMenu extends Component {

    navigateto = () => {
        const { navigation } = this.props;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
        });
        navigation.dispatch(resetAction);
    }

    navigateToScreen = (route) => () => {
        console.log("SideMenu: ", this.props.currentScreen)
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        let currentScreen = "Dashboard";
        return (
            <View style={styles.main}>
                <ScrollView>
                    <View>
                        <View style={styles.ImageContainer}>
                            <Image
                                source={Logo}
                                style={{ width: 70, height: 90 }}
                            />
                            <Logout navigateToScreen={this.navigateto} />
                        </View>

                        <View>
                            <View style={styles.sectionStyle}>
                                <FontAwesome style={styles.iconStyle} name='tachometer' size={25} color="#000" />
                                <Text
                                    style={styles.itemStyle}
                                    onPress={this.navigateToScreen('Dashboard')}
                                >
                                    Dashboard
                                </Text>
                            </View>

                            <View style={styles.sectionStyle}>
                                <FontAwesome style={styles.iconStyle} name="user" size={25} color="#000" />
                                <Text
                                    style={[styles.itemStyle, currentScreen === 'EditProfile'
                                    ? { color: "#263238" }
                                    : null ]}
                                    onPress={this.navigateToScreen('EditProfile')}
                                >
                                    Edit Profile
                                </Text>
                            </View>

                            <View style={styles.sectionStyle}>
                                <FontAwesome style={styles.iconStyle} name='sticky-note-o' size={25} color="#000" />
                                <Text
                                    style={styles.itemStyle}
                                    onPress={this.navigateToScreen('CreatePost')}
                                >
                                    Create Post
                                </Text>
                            </View>

                            <View style={styles.sectionStyle}>
                                <FontAwesome style={styles.iconStyle} name='briefcase' size={25} color="#000" />
                                <Text
                                    style={styles.itemStyle}
                                    onPress={this.navigateToScreen('JobDashboard')}
                                >
                                    Jobs
                                </Text>
                            </View>

                            <View style={styles.sectionStyle}>
                                <FontAwesome style={styles.iconStyle} name='th-large' size={25} color="#000" />
                                <Text
                                    style={styles.itemStyle}
                                    onPress={this.navigateToScreen('Categories')}
                                >
                                    Categories
                                </Text>
                            </View>

                            <View style={styles.sectionStyle}>
                                <FontAwesome style={styles.iconStyle} name='comment' size={25} color="#000" />
                                <Text
                                    style={styles.itemStyle}
                                    onPress={this.navigateToScreen('Chatting')}
                                >
                                    Chatting
                                </Text>
                            </View>

                            <View style={styles.sectionStyle}>
                                <FontAwesome style={styles.iconStyle} name='bell' size={25} color="#000" />
                                <Text
                                    style={styles.itemStyle}
                                    onPress={this.navigateToScreen('Notification')}
                                >
                                    Notifications
                                </Text>
                            </View>

                            <View style={styles.sectionStyle}>
                                <FontAwesome style={styles.iconStyle} name='rss' size={25} color="#000" />
                                <Text
                                    style={styles.itemStyle}
                                    onPress={this.navigateToScreen('Complaints')}
                                >
                                    Feedback
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Text style={styles.text}>Copyright @</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20
    },
    ImageContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#263238",
        marginBottom: 15
    },
    // text2: {
    //     marginTop: 1,
    //     fontSize: 15,
    //     fontWeight: "700",
    //     color: "white",
    //     backgroundColor: '#32CD32',
    //     padding: 10
    // },
    sectionStyle: {
        marginBottom: 5,
        flexDirection: 'row'
    },
    itemStyle: {
        paddingTop: 10, 
        fontSize: 20, 
        marginStart: 20, 
    },
    iconStyle: {
        paddingTop: 10,
        marginStart: 20,
    },
});

export default SideMenu;