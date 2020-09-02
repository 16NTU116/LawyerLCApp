import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignInpage from './src/pages/SignInPage';
import SignupPage from './src/pages/SignupPage';
import AnimateScene from './src/pages/AnimateScene';

import LawyerDashboardPage from './src/pages/LawyerDashboard';
import JobDashboardPage from './src/pages/JobPostStatus';
import AssignedCasePage from './src/pages/AssignedCase';
import MyJobPage from './src/pages/MyJobStatus';
import EditProfilePage from './src/pages/EditProfile';
import CreatePostPage from './src/pages/createPost';
import SearchedPostPage from './src/pages/SearchedPosts';
import SearchCategoryPostPage from './src/components/searchByCategory';
import SideMenu from './src/components/SideMenu';
import CategoriesPage from './src/pages/categories';
import ChattingPage from './src/pages/Chatting';
import NotificationPage from './src/pages/Notification';
import ComplaintsPage from './src/pages/Complaints';
import LogoutPage from './src/pages/Logout';

const CaseNavigator = createBottomTabNavigator({
  ClientCase: LawyerDashboardPage,
  AssignedCase: AssignedCasePage,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = FontAwesome;
      let iconName;
      if (routeName === 'ClientCase') {
        iconName = "sticky-note"

      } else if (routeName === 'AssignedCase') {
        iconName = "check-square"
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
}
);

const JobNavigator = createBottomTabNavigator({
  JobCase: JobDashboardPage,
  MyPosts: MyJobPage,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = FontAwesome;
      let iconName;
      if (routeName === 'ClientCase') {
        iconName = "sticky-note"

      } else if (routeName === 'AssignedCase') {
        iconName = "check-square"
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
}
);

const appContainer3 = createStackNavigator({
  Dashboard: CaseNavigator,
  EditProfile: EditProfilePage,
  CreatePost: CreatePostPage,
  SearchedPost: SearchedPostPage,
  SearchedCategoryPost: SearchCategoryPostPage,
  JobDashboard: JobNavigator,
  Categories: CategoriesPage,
  Chatting: ChattingPage,
  Notification: NotificationPage,
  Complaints: ComplaintsPage,
},
  {
    initialRouteName: "Dashboard",
    headerMode: "none"
  }
);

const appContainer = createDrawerNavigator({
  Dashboard: appContainer3,
  Logout: LogoutPage
},
  {
    contentOptions: {
      activeTintColor: "#e91e63",
      activeBackgroundColor : 'purple',
    },
    contentComponent: (props) => (
      <SideMenu currentScreen={props.navigation.state.routeName} {...props} />),
    drawerBackgroundColor: "#fff",
    drawerWidth: 200,
    drawerType: "slide",
  });

  const appContainer2 = createStackNavigator({
    isLoading: AnimateScene,
    SignIn: SignInpage,
    Signup: SignupPage,
    drawerApp : {
      screen: appContainer
    }
  },
    {
      initialRouteName: "isLoading",
      headerMode: "none"
    });
export default createAppContainer(appContainer2);