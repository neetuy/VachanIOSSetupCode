
import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import { Card, CardItem } from 'native-base';
import { HelpStyle } from './styles.js';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

class Help extends Component {
  static navigationOptions = {
    headerTitle: 'Help',
  };
  constructor(props) {
    super(props)
    this.state = {
    }
    this.styles = HelpStyle(this.props.colorFile, this.props.sizeFile);
  }

  render() {
    return (
      <View style={[this.styles.container,{padding:8}]}>
        <Card style={this.styles.Card}>
          <TouchableOpacity style={[{ flexDirection: 'row' }]} onPress={() => this.props.navigation.navigate('Hints')}>
            <CardItem style={this.styles.Card}>
              <Icon name='lightbulb-outline' style={this.styles.cardItemIconCustom} />
              <Text style={this.styles.textStyle}>Hints</Text>
            </CardItem>
          </TouchableOpacity>
        </Card>
        <Card style={this.styles.Card}>
          <TouchableOpacity style={[{ flexDirection: 'row' }]} onPress={() => this.props.navigation.navigate('Feedback')}>
            <CardItem style={this.styles.Card}>
              <Icon name='feedback' style={this.styles.cardItemIconCustom} />
              <Text style={this.styles.textStyle}>Feedback</Text>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
};
const mapStateToProps = state => {
  return {
    sizeFile: state.updateStyling.sizeFile,
    colorFile: state.updateStyling.colorFile,
  }
}

export default connect(mapStateToProps, null)(Help)