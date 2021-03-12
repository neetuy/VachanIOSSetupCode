import React, { Component } from 'react';
import { AppNavigator } from './app/routes/';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux'
import { Root } from "native-base";
import VersionCheck from 'react-native-version-check';
import { fetchAllContent, fetchVersionLanguage, APIBaseURL, updateVersion } from './app/store/action/';
import { Alert, BackHandler, Linking,SafeAreaView } from 'react-native';
import firebase from 'react-native-firebase'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isloading: false,
      signedIn: false,
      checkedSignIn: false
    }
  }
  checkUpdateNeeded = async () => {
    let latestVersion = await VersionCheck.getLatestVersion();
    let currentVersion = await VersionCheck.getCurrentVersion();
    VersionCheck.needUpdate({
      currentVersion: currentVersion,
      latestVersion: latestVersion,
    }).then(res => {
      if (res.isNeeded) {
        Alert.alert('Please update your app ',
          'You have to update your app to the latest version to continue using',
          [{
            text: 'Update',
            onPress: () => {
              BackHandler.exitApp();
              Linking.openURL(updateNeeded.storeUrl)
            }
          },
          {
            text: 'Cancel',
            onPress: () => {
              return
            }
          }
          ]
        )
      }
    });
  }


  async componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide()
    }, 400)
    firebase.database().ref("/apiBaseUrl/").on('value', (snapshot) => {
      this.props.APIBaseURL(snapshot.val())
      this.props.fetchVersionLanguage()
      this.props.fetchAllContent()
    })
    this.checkUpdateNeeded()

  }
  componentDidUpdate(prevProps) {
    if (this.props.updatedVersionData != prevProps.updatedVersionData) {
      this.props.updateVersion({
        language: this.props.updatedVersionData.language.name,
        languageCode: this.props.updatedVersionData.language.code,
        version: this.props.updatedVersionData.version.name,
        versionCode: this.props.updatedVersionData.version.code,
        sourceId: this.props.updatedVersionData.sourceId
      })

    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <Root>
        <AppNavigator />
      </Root>
      </SafeAreaView>
    )

  }
}
const mapStateToProps = state => {
  return {
    language: state.updateVersion.language,
    languageCode: state.updateVersion.languageCode,
    versionCode: state.updateVersion.versionCode,
    sourceId: state.updateVersion.sourceId,
    downloaded: state.updateVersion.downloaded,
    contentType: state.updateVersion.parallelContentType,
    updatedVersionData: state.versionFetch.bible,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllContent: () => dispatch(fetchAllContent()),
    fetchVersionLanguage: () => dispatch(fetchVersionLanguage()),
    APIBaseURL: (payload) => dispatch(APIBaseURL(payload)),
    updateVersion: (payload) => dispatch(updateVersion(payload)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)