import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class RedditItem extends Component {
  constructor(props) {
  		super(props)
  		this.state = {
        url: 'hot',
        res: undefined
  		}
  	}

  render() {
    return (
      <View style={{flex: 1, }}>
        <Text style={{alignItems: 'flex-start', flex: .66}} numberOfLines={2}>{this.props.data.title}</Text>
        <Text style={{alignItems: 'flex-end', flex: .33}}>{this.props.data.ups}</Text>
      </View>
    )
  }
}
