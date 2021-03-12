import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { sidebarStyle } from './styles.js';
import { constantFont } from '../../utils/dimens.js'

export default class FixedSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: null
    }
    this.animatedValue = new Animated.Value(0)

  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }


  handlePressIn = (index) => {

    this.setState({ index })
    Animated.spring(this.animatedValue, {
      toValue: 0
    }).start()
  }

  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
    }).start()
  }
  renderItem = ({ item,index }) => {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.onPress(item.pressIcon, index)}
        onPressIn={() => this.handlePressIn(index)}
        onPressOut={() => this.handlePressOut()}
      >
        <Animated.View style={[sidebarStyle.AnimatedViewCustom, this.props.doAnimate == true && index == this.state.index ? animatedStyle : null]}>
          <Icon name={item.icon} size={constantFont.iconLarge}
            style={sidebarStyle.iconColor}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    }
    const iconName = [
      { icon: 'menu', pressIcon: 'Menu' },
      { icon: 'volume-up', pressIcon: 'Audio' },
      { icon: 'video-library', pressIcon: 'Video' },
      { icon: 'image', pressIcon: 'Image' },
      { icon: 'search', pressIcon: 'Search' },
      { icon: 'bookmark', pressIcon: 'Bookmarks' },
      { icon: 'local-library', pressIcon: 'local-library' },
      { icon: 'history', pressIcon: 'history' },
      { icon: 'note', pressIcon: 'Notes' },
      { icon: 'border-color', pressIcon: 'Highlights' },
      { icon: 'settings', pressIcon: 'Settings' },
      { icon: 'book', pressIcon: 'Book' },
      { icon: 'info', pressIcon: 'About' },
      { icon: 'book-open-variant', pressIcon: 'Multi-Content' },
    ]
    return (
      <View style={sidebarStyle.container}>
        {
          <FlatList
            data={iconName}
            renderItem={this.renderItem}
          />
        }
      </View>
    );
  }
};

