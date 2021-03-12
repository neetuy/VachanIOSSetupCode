import React, { Component } from 'react';
import {ActivityIndicator,View} from 'react-native'
import { WebView } from 'react-native-webview'
import { HelpStyle } from './styles.js';
import { connect } from 'react-redux'
import Color from '../../utils/colorConstants'


class Feedback extends Component {
    static navigationOptions = {
        headerTitle: 'Feedback',
      };
    constructor(props) {
        super(props)
        this.state = {
        }
        this.styleFile = HelpStyle(this.props.colorFile, this.props.sizeFile);

    }

    displaySpinner() {
        return (
            <View style={{flex:1}}>
                <ActivityIndicator size="large" color={Color.Blue_Color} />
            </View>
        )
    }
    render() {
        return (
            <WebView
                startInLoadingState={true}
                style={this.styleFile.container}
                source={{
                    uri: 'https://docs.google.com/forms/d/e/1FAIpQLSd75swOEtsvWrzcQrynmCsu-ZZYktWbeeJXVxH7zNz-JIlEdA/viewform'
                }}
                renderLoading={() => {
                    return this.displaySpinner();
                }}
            />
        );
    }
};

const mapStateToProps = state => {
    return {
        sizeFile: state.updateStyling.sizeFile,
        colorFile: state.updateStyling.colorFile,
    }
}

export default connect(mapStateToProps, null)(Feedback)

