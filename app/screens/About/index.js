import React, { Component } from 'react';
import {
  Text,
  View,
  Linking,
  Dimensions,
  ScrollView
} from 'react-native';
import { aboutPage } from './styles.js'
import { connect } from 'react-redux'
const screenHeight = Dimensions.get('window').height
class About extends Component {
  static navigationOptions = {
    headerTitle: 'About Us',
  };
  constructor(props) {
    super(props);
    this.styles = aboutPage(this.props.colorFile, this.props.sizeFile);
  }

  render() {
    return (
      <View style={[this.styles.container, { height: screenHeight }]}>
        <ScrollView >
          <View style={this.styles.textContainer}>
            <Text textBreakStrategy={'simple'} style={this.styles.TitleText}>Release Notes for VachanGo 11/11/2020</Text>
            <Text style={this.styles.textStyle} textBreakStrategy={'simple'}>
              The Vachan Project <Text style={this.styles.linkText} onPress={() => { Linking.openURL('http://thevachanproject.in/') }}>(http://thevachanproject.in/)</Text> was established to provide free access to digital scripture engagement resources. The VachanGo app, developed under it’s umbrella is a cross platform Bible study tool in Indian languages that brings you biblical content under multiple licensing arrangements. Hence, the content available to you for personal or group Bible Study, is not for further redistribution in any other format or platform without explicit permission from the original copyright owners.{'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.TitleText}>{'\n'}Content and Technology{'\n'}</Text>
              VachanGo is being made available under a collaborative arrangement among Friends of Agape, unfoldingWord, Wycliffe Associates, Crossway, Bridgeway Publications, Dusty Sandals, BibleProject, Visual Unit, and is brought to you by Bridge Connectivity Solutions Pvt. Ltd. (BCS) <Text style={this.styles.linkText} onPress={() => { Linking.openURL('https://www.bridgeconn.com') }}>(https://www.bridgeconn.com)</Text> who is the localization and technology partner.{'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.TitleText}>{'\n'}Release v1.0{'\n'}</Text>
              <Text textBreakStrategy={'simple'} style={{ fontWeight: 'bold' }}>Platform: </Text>
              The mobile app is written in ReactNative, powered by Postgres and Python APIs  (VachanEngine) in the back-end.{'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.TitleText}>{'\n'}Content Available :{'\n'}</Text>
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Bibles: Latest versions of IRV Bibles in all available Indian Gateway languages{'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Commentary: IRV Notes (Hindi) +  Bridgeway Bible Commentary (English){'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Dictionary: IRV Dictionary (Hindi){'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Infographics: VisualUnit (Hindi) {'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Audio: IRV NT Bible (Hindi){'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Video: BibleProject (English, Hindi & Telugu) {'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.TitleText}>{'\n'}Features:{'\n'}</Text>
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Clean Bible reading pane with section-headings.{'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Parallel 2-pane feature to display Bibles, Commentaries etc.{'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Personalization using simple login.{'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Bookmarks, Highlights & Notes.{'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Basic Bible search.{'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.TitleText}>{'\n'}Backend Services:{'\n'}</Text>
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>DigitalOcean Spaces with CDN to serve Audio & Video  {'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.bulletIcon}>{'\u2022' + " "}</Text>Firebase for personalisation and synchronisation {'\n'}
              <Text textBreakStrategy={'simple'} style={this.styles.TitleText}>{'\n'}Contact Us</Text>{'\n'}
              thevachanproject@gmail.com
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    sizeFile: state.updateStyling.sizeFile,
    colorFile: state.updateStyling.colorFile,
  }
}

export default connect(mapStateToProps, null)(About)
