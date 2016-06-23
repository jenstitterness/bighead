/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Network,
  ListView
} from 'react-native';

import RedditItem from './components/RedditItem';

export default class bighead extends Component {
  constructor(props) {
  		super(props)
  		this.state = {
        url: 'hot',
        res: undefined
  		}
  	}

  componentDidMount() {
    console.log(this.state, 'https://www.reddit.com/'+this.state.url+'.json')

    this.fetch();
  }

  fetch() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    fetch('https://www.reddit.com/'+this.state.url+'.json').then((res) => {
      console.log(JSON.parse(res._bodyText));
      this.setState({
        res: ds.cloneWithRows(JSON.parse(res._bodyText).data.children)
      })
    });
  }

  render() {
    let list;
    if (this.state.res) {
      list = (
        <ListView dataSource={this.state.res} renderRow={(row) => <RedditItem data={row.data} /> }/>
      )
    }
    return (
      <View style={styles.container}>
        <View style={{height: 50}}>
          <TouchableHighlight onPress={() => { this.setState({url: 'hot'});  this.fetch() } }>
            <Text style={{alignSelf: 'flex-start'}}>Hot</Text>
          </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.setState({url: 'new'}); this.fetch() } }>
            <Text style={{alignSelf: 'center'}}>New</Text>
          </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.setState({url: 'rising'}); this.fetch() } }>
            <Text style={{alignSelf: 'flex-end'}}>Rising</Text>
          </TouchableHighlight>
        </View>
        {list}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('bighead', () => bighead);
