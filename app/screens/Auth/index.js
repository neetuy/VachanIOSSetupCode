import React, { Component } from 'react';
import { connect } from 'react-redux'
import { userInfo } from '../../store/action'
import Login from './Login'
import firebase from 'react-native-firebase'
import { styles } from './styles.js'
import ProfilePage from './ProfilePage';

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

  logOut = () => {
    firebase.auth().signOut()
    this.props.userInfo({ email: null, uid: null, userName: '', phoneNumber: null, photo: null })
    this.setState({ user: null })
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
