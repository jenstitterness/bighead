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
  ListView,
  WebView
} from 'react-native';

import Urlparser from 'url-parse';

import RedditItem from './components/RedditItem';

export default class bighead extends Component {
  constructor(props) {
  		super(props);

      this.randomToken = Math.floor(Math.random() * (10000 - 2) + 2);


  		this.state = {
        currentUrl: 'hot',
        res: undefined,
        accessToken: undefined,
        loggedIn: false,
        loginURL: "https://www.reddit.com/api/v1/authorize?client_id=RK35OCrjPrXsIw&response_type=token&state="+this.randomToken+"&redirect_uri=bighead://reddit&scope=identity read mysubreddits"
  		}
  	}

  componentDidMount() {
    console.log(this.state, 'https://www.reddit.com/'+this.state.url+'.json')

  }

  fetch() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
console.log('url after login:', 'https://oauth.reddit.com/api/v1/me')
    fetch('https://oauth.reddit.com/'+ this.state.currentUrl + '.json', {
      headers: {
        'Authorization': 'bearer '+this.state.accessToken,

      }
    }).then((res) => {
      console.log("1", JSON.parse(res._bodyText));
      this.setState({
        res: ds.cloneWithRows(JSON.parse(res._bodyText).data.children)
      })
    });
  }

  render() {
    if (!this.state.loggedIn) {
      return this.login();
    }
    // this.fetch();


    let list;
    if (this.state.res) {
      list = (
        <ListView dataSource={this.state.res} renderRow={(row) => <RedditItem data={row.data} /> }/>
      )
    } else {
      this.fetch();
    }
    return (
      <View style={styles.container}>
        <View style={{height: 50}}>
          <TouchableHighlight onPress={() => { this.setState({currentUrl: 'hot'});  this.fetch() } }>
            <Text style={{alignSelf: 'flex-start'}}>Hot</Text>
          </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.setState({currentUrl: 'new'}); this.fetch() } }>
            <Text style={{alignSelf: 'center'}}>New</Text>
          </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.setState({currentUrl: 'rising'}); this.fetch() } }>
            <Text style={{alignSelf: 'flex-end'}}>Rising</Text>
          </TouchableHighlight>
        </View>
        {list}
      </View>
    );
  }

  login() {
    return (
      <WebView style={{flex: 1, height: 650}}
      source={{uri: this.state.loginURL}}
      javaScriptEnabled={true}
      onNavigationStateChange={this.urlChanged.bind(this)}
      scalesPageToFit={true}
      />
    );
  }
  urlChanged(res) {
    console.log('url changed', res, this)
    // if (url.url.indexOf('bighead://') > 0) {
    let url = Urlparser(res.url);
    console.log('url', Urlparser(res.url, true));

    if (url.protocol === "bighead:"){
      this.getQueryParams(url.hash);
    }

  }

  getQueryParams(query) {
    var split = query.split("&");
    let accessToken = split[0].split("=")[1];
    console.log(split, accessToken);
    this.setState({
      accessToken: accessToken,
      loggedIn: true
    });
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
