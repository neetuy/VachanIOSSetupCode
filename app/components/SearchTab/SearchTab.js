import React, { Component } from 'react';
import { Button, Segment, Text } from 'native-base'
import { styles } from './styles'
import Color from '../../utils/colorConstants'
const SearchResultTypes = {
  ALL: 0,
  OT: 1,
  NT: 2
};

export default class SearchTab extends Component {
  render() {
    return (
      <Segment style={styles.container}>
        <Button
          style={[
            { backgroundColor: this.props.activeTab === SearchResultTypes.ALL ? Color.Blue_Color : Color.White },
            styles.button
          ]}
          onPress={() => this.props.toggleFunction(SearchResultTypes.ALL)}
          active={this.props.activeTab == SearchResultTypes.ALL ? true : false}
        >
          <Text
            active={this.props.activeTab}
            style={{
              color: this.props.activeTab == SearchResultTypes.ALL ? Color.White : Color.Blue_Color
            }}
          >
            All
          </Text>
        </Button>
        <Button
          style={[
            { backgroundColor: this.props.activeTab == SearchResultTypes.OT ? Color.Blue_Color : Color.White },
            styles.buttonCenter
          ]}
          onPress={() => this.props.toggleFunction(SearchResultTypes.OT)}
          active={this.props.activeTab == SearchResultTypes.OT ? true : false}
        >
          <Text
            active={this.props.activeTab}
            style={{
              color: this.props.activeTab == SearchResultTypes.OT ? Color.White : Color.Blue_Color
            }}
          >
            Old Testament
          </Text>
        </Button>
        <Button
          style={[
            { backgroundColor: this.props.activeTab == SearchResultTypes.NT ? Color.Blue_Color : Color.White },
            styles.button
          ]}
          onPress={() => this.props.toggleFunction(SearchResultTypes.NT)}
          active={this.props.activeTab == SearchResultTypes.NT ? true : false}
        >
          <Text
            active={this.props.activeTab}
            style={{
              color: this.props.activeTab == SearchResultTypes.NT ? Color.White : Color.Blue_Color
            }}
          >
            New Testament
          </Text>
        </Button>
      </Segment>
    )
  }
}
