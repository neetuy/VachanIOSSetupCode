
import React, { Component,Fragment } from 'react';
import { ActivityIndicator, View, Text, TextInput, Image, Button, Alert, Platform, KeyboardAvoidingView,SafeAreaView,StatusBar } from 'react-native';
import firebase from 'react-native-firebase'
import { userInfo } from '../../store/action/'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles.js'
import Color from '../../utils/colorConstants'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      email: '',
      password: '',
      cpassword: '',
      passwordVisible1: true,
      passwordVisible2: true,
      isLoading: false,
      filePath: {},
    }
    this.styles = styles(this.props.colorFile, this.props.sizeFile);
  }
  
  //on change text function for textInput
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      if (this.state.cpassword === this.state.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(async (res) => {
            this.setState({ isLoading: false })
            this.props.navigation.navigate("Bible")
          })
          .catch(error => {
            if (error.code === 'auth/weak-password') {
              Alert.alert("Weak password")

            }
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert("Email already in use")

            }
            if (error.code === 'auth/invalid-email') {
              Alert.alert("Invalid Email")
            }
            this.setState({ isLoading: false })
          })
      }
      else {
        Alert.alert("Password and confirm password donot match")
        this.setState({ isLoading: false })
      }
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={this.styles.preloader}>
          <ActivityIndicator size="large" color={Color.Blue_Color} />
        </View>
      )
    }
    return (
      <Fragment>
      <SafeAreaView style={{ flex: 1, backgroundColor:Color.White }} >
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={this.styles.container} >
        <View>
          <Icon name='close' size={28} style={this.styles.headerCloseIcon} onPress={() => { this.props.navigation.pop() }} />
        </View>
        <View style={{ padding: 35, flex: 1 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{ width: 50, height: 50, marginVertical: 16 }}
              source={require('../../assets/bcs_old_favicon.png')}
            />
            <Text style={{ fontSize: 26, color: Color.Blue_Color, fontWeight: 'bold' }}>Sign Up</Text>
          </View>
          <View style={{
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <TextInput
              style={this.styles.inputStyle}
              placeholder="Name"
              placeholderTextColor={this.styles.placeholderColor.color}
              value={this.state.displayName}
              onChangeText={(val) => this.updateInputVal(val, 'displayName')}
            />
            <TextInput
              style={this.styles.inputStyle}
              placeholder="Email"
              placeholderTextColor={this.styles.placeholderColor.color}
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
            <View>
              <TextInput
                style={this.styles.inputStyle}
                placeholder="Password"
                placeholderTextColor={this.styles.placeholderColor.color}
                value={this.state.password}
                onChangeText={(val) => this.updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={this.state.passwordVisible1}
              />
              <Icon name={this.state.passwordVisible1 ? 'eye' : 'eye-off'} size={24} style={this.styles.eyeIcon} onPress={() => this.setState({ passwordVisible1: !this.state.passwordVisible1 })} />
            </View>
            <View>
              <TextInput
                style={this.styles.inputStyle}
                placeholder="Confirm Password"
                placeholderTextColor={this.styles.placeholderColor.color}
                value={this.state.cpassword}
                onChangeText={(val) => this.updateInputVal(val, 'cpassword')}
                maxLength={15}
                secureTextEntry={this.state.passwordVisible2}
              />
              <Icon name={this.state.passwordVisible2 ? 'eye' : 'eye-off'} size={24} style={this.styles.eyeIcon} onPress={() => this.setState({ passwordVisible2: !this.state.passwordVisible2 })} />
            </View>
            <Button
              color={Color.Blue_Color}
              title="Sign Up"
              onPress={() => this.registerUser()}
            />
            <Text
              style={this.styles.loginText}
              onPress={() => this.props.navigation.goBack()}>
              Already Registered? Click here to Sign In
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
      </Fragment>
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.updateVersion.language,
    versionCode: state.updateVersion.versionCode,

    email: state.userInfo.email,
    uid: state.userInfo.uid,
    userName: state.userInfo.userName,
    phoneNumber: state.userInfo.phoneNumber,

    sizeFile: state.updateStyling.sizeFile,
    colorFile: state.updateStyling.colorFile
  }
}
const mapDispatchToProps = dispatch => {
  return {
    userInfo: (payload) => dispatch(userInfo(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

