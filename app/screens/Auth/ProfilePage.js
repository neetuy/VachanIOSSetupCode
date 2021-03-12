import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import { connect } from 'react-redux'
import { Card, CardItem, Header, Left, Button, Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { userInfo } from '../../store/action'
import firebase from 'react-native-firebase'
import { styles } from './styles.js'
import Color from '../../utils/colorConstants'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: this.props.photo,
      userData: '',
      isLoading: false
    }
    this.styles = styles(this.props.colorFile, this.props.sizeFile);
  }
  async componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return
      }
      else {
        this.setState({ user: user._user.email, userData: user, isLoading: false, imageUrl: user._user.photoURL })
        this.props.userInfo({
          email: user._user.email, uid: user._user.uid,
          userName: user._user.displayName, phoneNumber: null, photo: user._user.photoURL
        })
        this.setState({ isLoading: true })
      }
    })
  }
  
  render() {
    this.styles = styles(this.props.colorFile, this.props.sizeFile);
    return (
      <View style={this.styles.container}>
        <Header style={{ backgroundColor: Color.Blue_Color }}>
          <Left>
            <Button transparent onPress={()=>{this.props.navigation.navigate("Bible")}}>
              <Icon size={24} color={Color.White} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <View style={this.styles.cardBgColor}>
          <Card style={this.styles.cardStyling}>
            <CardItem style={this.styles.cardItemStyling}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={this.styles.avatar} source={this.props.photo != null ? { uri: this.props.photo } : require('../../assets/account.png')} />
                <View>
                  <Text style={[this.styles.textStyle, { paddingRight: 8 }]}>{this.props.email}</Text>
                  <Text style={[this.styles.textStyle, { paddingRight: 8 }]}>{this.props.userName}</Text>
                </View>
              </View>
            </CardItem>
          </Card>
          <View></View>
          <Card style={this.styles.cardStyling}>
            <CardItem header button style={[this.styles.cardItemStyling, { flexDirection: 'row' }]} onPress={() => this.props.navigation.navigate('Settings')}>
              <Icon name='settings' style={this.styles.cardItemIconCustom} />
              <Text style={this.styles.textStyle}>Settings</Text>
            </CardItem>
            <CardItem header button style={[this.styles.cardItemStyling, { flexDirection: 'row' }]} onPress={() => this.props.navigation.navigate('About')}>
              <Icon name='info' style={this.styles.cardItemIconCustom} />
              <Text style={this.styles.textStyle}>About</Text>
            </CardItem>
          </Card>
          <Card style={this.styles.cardStyling}>
            <CardItem header button onPress={this.props.logOut} style={[this.styles.cardItemStyling, { alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={this.styles.textStyle}>LOG OUT</Text>
            </CardItem>
          </Card>
        </View>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
