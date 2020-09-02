import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { NavigationActions, StackActions } from 'react-navigation';
import { RadioButton } from 'react-native-paper';

// Redux
import { connect } from 'react-redux';
import { sendLawyerPost } from '../store/actions/job-action';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: { value: '' },
                id: { value: '' },
                title: { value: '' },
                details: { value: '' },
                contact: { value: '' },
                // avatarSource: { value: '' },
                jobType: { value: 'Criminal' },
            },
        };
    }

    updateInput = (name, text) => {
        let formCopy = this.state.form;
        formCopy[name].value = text;

        this.setState({
            form: formCopy,
        });
    };

    async submitUser() {
        const { form } = this.state;
        let formToSubmit = {};
        // const name = email.trim();

        form['name'].value = this.props.user.name;
        // return console.log(this.props.user._id);
        form['id'].value = this.props.user._id;

        // return console.log(form);

        let formCopy = form;

        for (let key in formCopy) {
            formToSubmit[key] = formCopy[key].value;
        }
        return await this.props.sendLawyerPost(formToSubmit);
    };

    onUploadImage = () => {

        ImagePicker.showImagePicker({}, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
                const source = response.uri;

                console.log("Picture is", source);
                this.setState({
                    form: {

                    }
                });
            }
        });
    }
    getnavigate() {
        const { navigation } = this.props;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'drawerApp' })],
        });
        navigation.dispatch(resetAction);
    }

    creaetePost = () => {
        this.props.navigation.navigate("Dashboard");
    }

    render() {
        console.disableYellowBox = true;
        const { jobType } = this.state.form;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <TextInput
                        value={this.state.title}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        placeholder="Enter Case Title"
                        onChangeText={text => this.updateInput('title', text)}
                    />
                    <TextInput
                        placeholder="Enter Case Details"
                        multiline={true}
                        numberOfLines={10}
                        value={this.state.details}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        onChangeText={text => this.updateInput('details', text)}

                    />
                    <TextInput
                        value={this.state.contact}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        placeholder="Enter Contact Number"
                        keyboardType="phone-pad"
                        onChangeText={text => this.updateInput('contact', text)}
                    />
                    <View style={styles.dropdown}>
                        <Text style={{ marginEnd: "10%", marginVertical: "5%", fontWeight: "bold", fontSize: 22 }}>Work Type:</Text>
                        <RadioButton.Group onValueChange={text => this.updateInput("jobType", text)} value={jobType.value}>
                            <View style={{ marginEnd: "10%" }}>
                                <Text style={{ marginVertical: "2%", fontWeight: "800", fontSize: 18 }}>Job</Text>
                                <RadioButton value="Job" />
                            </View>
                            <View style={{ marginEnd: "10%" }}>
                                <Text style={{ marginVertical: "2%", fontWeight: "800", fontSize: 18 }}>Internship</Text>
                                <RadioButton value="Internship" />
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Image style={styles.image} source={this.state.avatarSource || require('../images/noimage.png')}></Image>
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={this.onUploadImage}
                        >
                            <Text style={{ fontSize: 12 }, styles.buttonText}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.submitUser().then(res => {
                                console.log("Response is: ", res);
                                if (res != 0)
                                    setTimeout(() => { this.getnavigate() }, 1000)
                            })
                        }
                        }
                    >
                        <Text style={styles.buttonText}>Create Post</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.lawyer,
});

export default connect(mapStateToProps, { sendLawyerPost })(CreatePost);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "88%",
        backgroundColor: 'rgba(255, 255, 255, 1.8)',
        marginVertical: 10,
        paddingHorizontal: 16,
        borderColor: "#303331",
        borderRadius: 25,
        fontSize: 16,
        borderWidth: 1,
        textAlignVertical: "top",
        marginStart: "6%",
        marginEnd: "6%"
    },
    button: {
        width: 300,
        backgroundColor: '#000a12',
        marginVertical: 10,
        paddingVertical: 12,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: "#ffffff",
        textAlign: "center"
    },
    button: {
        width: "60%",
        backgroundColor: "#263238",
        marginVertical: 40,
        paddingVertical: 12,
        borderRadius: 25,
        marginStart: "20%",
        marginEnd: "20%"
    },
    uploadButton: {
        width: "44%",
        backgroundColor: "#263238",
        paddingVertical: 6,
        borderRadius: 25,
        paddingTop: 15,
        height: 'auto',
        marginStart: "10%",
        marginEnd: "10%"
    },
    image: {
        width: "16%",
        height: 50,
        marginRight: 30,
        alignItems: 'center',
        marginStart: "10%",
        marginEnd: "10%"
    },
    dropdown: {
        marginStart: "6%",
        marginEnd: "6%",
        marginVertical: 10,
        flex: 1,
        flexDirection: 'row'
    }
});





















// import React, { Component } from 'react';
// import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, ToastAndroid } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import { SegmentedControls } from 'react-native-radio-buttons';
// import { NavigationActions, StackActions } from 'react-navigation';

// // Redux
// import { connect } from 'react-redux';
// import { sendPost } from '../store/actions/post-action';

// class CreatePost extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             // form: {
//             //     name: { value: '' },
//             //     id: { value: '' },
//             //     title: { value: '' },
//             //     details: { value: '' },
//             //     contact: { value: '' },
//             //     // avatarSource: { value: '' },
//             //     jobType: { value: '' },
//             // },
//             post: {
//                 name: "",
//                 id: "",
//                 title2: "",
//                 details: "",
//                 contact: "",
//                 jobType: "",
//             },
//             // avatarSource: { value: '' },

//             optionsof: [
//                 "Job",
//                 "Internship"
//             ]
//         };
//     }

//     componentDidMount() {
//         const { user } = this.props;
//         console.log("User data is:", user);
//         this.setState(() => ({
//             post: {
//                 id: user._id,
//                 name: user.name
//             }
//         }))
//     }
//     practice = () => {
//         // updateInput = (name, text) => {
//         //     let formCopy = this.state.form;
//         //     formCopy[name].value = text;

//         //     this.setState({
//         //         form: formCopy,
//         //     });
//         // };

//         // async submitUser() {
//         //     const { form } = this.state;
//         //     // const { user } = this.props;
//         //     let formToSubmit = {};
//         //     // const name = email.trim();
//         //     // console.log("User data is: ", user.name);
//         //     // form['name'].value = user.name;
//         //     // // return console.log(this.props.user._id);
//         //     // form['id'].value = user._id;

//         //     return console.log(this.state);

//         //     let formCopy = form;

//         //     for (let key in formCopy) {
//         //         formToSubmit[key] = formCopy[key].value;
//         //     }

//         //     const { title, details, contact, jobType } = formToSubmit;
//         //     const success = 0;

//         //     if (!title || !details || !contact || !jobType) {
//         //         ToastAndroid.show("Fill Credentials", ToastAndroid.LONG);
//         //         return success;
//         //     }
//         //     return await this.props.sendPost(formToSubmit);
//         // };
//     }

//     async submitUser() {
//         const { name, id, title2, details, contact, jobType } = this.state.post;
//         const data = {
//             id: id,
//             name: name,
//             title: title2,
//             details: details,
//             contact: contact,
//             jobType: jobType
//         }

//         return console.log("Data is: ", data);

//         const success = 0;

//         if (!title || !details || !contact || !jobType) {
//             ToastAndroid.show("Fill Credentials", ToastAndroid.LONG);
//             return success;
//         }
//         return await this.props.sendPost(formToSubmit);
//     };

//     onUploadImage = () => {

//         ImagePicker.showImagePicker({}, (response) => {
//             // console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 // const source = { uri: response.uri };
//                 const source = response.uri;

//                 console.log("Picture is", source);
//                 this.setState({
//                     avatarSource: source,
//                 });
//             }
//         });
//     }

//     getnavigate() {
//         const { navigation } = this.props;
//         const resetAction = StackActions.reset({
//             index: 0,
//             actions: [NavigationActions.navigate({ routeName: 'drawerApp' })],
//         });
//         navigation.dispatch(resetAction);
//     }

//     setSelectedOption(selectedOption) {
//         this.setState({
//             selectedOption: selectedOption,
//             post: {
//                 jobType: selectedOption
//             }
//         });
//     }

//     onChangeHandler1 = (event) => (this.setState(() => ({ post: { title2: event }})));
//     onChangeHandler2 = (event) => (this.setState(() => ({ post: { details: event }})));
//     onChangeHandler3 = (event) => (this.setState(() => ({ post: { contact: event }})));

//     render() {
//         console.disableYellowBox = true;
//         return (
//             <View style={styles.container}>
//                 <ScrollView>
//                     <TextInput
//                         value={this.state.post.title}
//                         underlineColorAndroid='rgba(0, 0, 0, 0)'
//                         style={styles.input}
//                         placeholder="Enter Case Title"
//                         onChange={text => this.onChangeHandler1(text)}
//                     />
//                     <TextInput
//                         placeholder="Enter Case Details"
//                         multiline={true}
//                         numberOfLines={10}
//                         value={this.state.post.details}
//                         underlineColorAndroid='rgba(0, 0, 0, 0)'
//                         style={styles.input}
//                         onChangeText={text => this.onChangeHandler2(text)}
//                     />
//                     <TextInput
//                         value={this.state.post.contact}
//                         underlineColorAndroid='rgba(0, 0, 0, 0)'
//                         style={styles.input}
//                         placeholder="Enter Contact Number"
//                         keyboardType="phone-pad"
//                         onChangeText={text => this.onChangeHandler3(text)}
//                     />
//                     <View style={styles.dropdown}>
//                         <SegmentedControls
//                             tint={'#f80046'}
//                             selectedTint={'white'}
//                             backTint={'#1e2126'}
//                             options={this.state.optionsof}
//                             allowFontScaling={false} // default: true
//                             onSelection={this.setSelectedOption.bind(this)}
//                             selectedOption={this.state.selectedOption}
//                             optionStyle={{ fontFamily: 'AvenirNext-Medium' }}
//                             optionContainerStyle={{ flex: 1 }}
//                         />
//                     </View>
//                     <View style={{ flexDirection: "row", marginTop: 20 }}>
//                         <Image style={styles.image} source={this.state.avatarSource || require('../images/noimage.png')}></Image>
//                         <TouchableOpacity
//                             style={styles.uploadButton}
//                             onPress={this.onUploadImage}
//                         >
//                             <Text style={{ fontSize: 12 }, styles.buttonText}>Upload</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={() => {
//                             this.submitUser().then(res => {
//                                 console.log("Response is: ", res);
//                                 if (res != 0)
//                                     setTimeout(() => { this.getnavigate() }, 1000)
//                             })
//                         }
//                         }
//                     >
//                         <Text style={styles.buttonText}>Create Post</Text>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </View>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     user: state.user.lawyer,
// });

// export default connect(mapStateToProps, { sendPost })(CreatePost);

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     input: {
//         width: "88%",
//         backgroundColor: 'rgba(255, 255, 255, 1.8)',
//         marginVertical: 10,
//         paddingHorizontal: 16,
//         borderColor: "#303331",
//         borderRadius: 25,
//         fontSize: 16,
//         borderWidth: 1,
//         textAlignVertical: "top",
//         marginStart: "6%",
//         marginEnd: "6%"
//     },
//     button: {
//         width: 300,
//         backgroundColor: '#000a12',
//         marginVertical: 10,
//         paddingVertical: 12,
//         borderRadius: 25,
//     },
//     buttonText: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: "#ffffff",
//         textAlign: "center"
//     },
//     button: {
//         width: "60%",
//         backgroundColor: "#263238",
//         marginVertical: 40,
//         paddingVertical: 12,
//         borderRadius: 25,
//         marginStart: "20%",
//         marginEnd: "20%"
//     },
//     uploadButton: {
//         width: "44%",
//         backgroundColor: "#263238",
//         paddingVertical: 6,
//         borderRadius: 25,
//         paddingTop: 15,
//         height: 'auto',
//         marginStart: "10%",
//         marginEnd: "10%"
//     },
//     image: {
//         width: "16%",
//         height: 50,
//         marginRight: 30,
//         alignItems: 'center',
//         marginStart: "10%",
//         marginEnd: "10%"
//     },
//     dropdown: {
//         marginStart: "6%",
//         marginEnd: "6%"
//     }
// });