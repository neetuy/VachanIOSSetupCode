import React, { Component } from 'react';
import { ActivityIndicator, View, Alert, TextInput, Text, TouchableOpacity, Button } from 'react-native';
import firebase from 'react-native-firebase'
import { styles } from './styles.js'
import { connect } from 'react-redux'
import Color from '../../utils/colorConstants'


class Reset extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      isLoading: false
    }
    this.styles = styles(this.props.colorFile, this.props.sizeFile);
  }
  
  //on change text function for textInput
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  reset = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase.auth().sendPasswordResetEmail(this.state.email)
        .then((onVal) => {
          alert('We will attempt to send a reset password email to ' + this.state.email + '\n' + "Click the email to Continue")
          this.setState({
            isLoading: false,
          })
        })
        .catch((error) => {
          if (code === 'auth/user-not-found') {
            Alert.alert(" user not found ")
          }
          this.setState({
            isLoading: false,
          })
        })
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
      <View style={this.styles.container}>
        <View style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 35
        }}>
          <Text style={this.styles.textStyle}>Enter your email address and we'll send a link to reset your password.</Text>
          <TextInput
            style={this.styles.inputStyle}
            placeholderTextColor={this.styles.placeholderColor.color}
            placeholder="Enter email"
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
          />
          <Button
            color={Color.Blue_Color}
            title="Reset Password"
            onPress={() => this.reset()}
          />
          <Text
            style={this.styles.loginText}
            onPress={() => this.props.navigation.goBack()}>
            Back to login
            </Text>
        </View>
      </View>
    )
  }

}

const mapStateToProps = state => {
  return {
    email: state.userInfo.email,
    uid: state.userInfo.uid,
    photo: state.userInfo.photo,
    userName: state.userInfo.userName,

    sizeFile: state.updateStyling.sizeFile,
    colorFile: state.updateStyling.colorFile,
  }
}


export default connect(mapStateToProps, null)(Reset)