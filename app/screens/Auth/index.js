import React, { Component } from 'react';
import { connect } from 'react-redux'
import { userInfo } from '../../store/action'
import Login from './Login'
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'
import { styles } from './styles.js'
import ProfilePage from './ProfilePage';
import {Platform} from 'react-native';

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.email,
      imageUrl: this.props.photo,
      userData: '',
      isLoading: false
    }
    this.styles = styles(this.props.colorFile, this.props.sizeFile);
  }

  logOut = async() => {
    try {
      await GoogleSignin.revokeAccess();
      await firebase.auth().signOut()
      await GoogleSignin.signOut();
      this.props.userInfo({ email: null, uid: null, userName: '', phoneNumber: null, photo: null })
      this.setState({ user: null })
      this.props.navigation.navigate("Bible")
    } catch (error) {
      console.error("logout error",error);
    }
   
  }
  componentDidMount() {
    try{
      GoogleSignin.configure({
        webClientId:Platform.OS =='android' ? '486797934259-gkdusccl094153bdj8cbugfcf5tqqb4j.apps.googleusercontent.com' : '200568144927-dgtm80qklk0cenecn7kcl80r2g9vf81a.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // hostedDomain: 'localhost', // specifies a hosted domain restriction
        // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceConsentPrompt: false, // [Android] if you want to show the authorization prompt at each login.
        // accountName: '', // [Android] specifies an account name on the device that should be used
        // iosClientId: '200568144927-dgtm80qklk0cenecn7kcl80r2g9vf81a.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      });
    }catch(error){
      console.log(" configuration error ",error)
    }
  }
  render() {
    if (!this.state.user) {
      return <Login navigation={this.props.navigation} user={this.state.user} />
    }
    else {
      return (
        <ProfilePage navigation={this.props.navigation} logOut={this.logOut} />
      )
    }
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
const mapDispatchToProps = dispatch => {
  return {
    userInfo: (payload) => dispatch(userInfo(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
