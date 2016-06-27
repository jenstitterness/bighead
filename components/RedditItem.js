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
    let evenRow = this.props.id % 2 == 0;
    return (
      <View style={[styles.row, evenRow && styles.evenRow]}>
        <Text style={styles.points} onPress={this.loadRedditPost}>{this.props.data.score}</Text>
        <Text style={styles.title} onPress={this.loadRedditPost}>{this.props.data.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 6
  },
  evenRow: {
    backgroundColor: '#dcf4ff'
  },
  points: {
    alignSelf: 'center'
  },
  title: {
    flex: 0.8,
    paddingLeft:6
  },
});
