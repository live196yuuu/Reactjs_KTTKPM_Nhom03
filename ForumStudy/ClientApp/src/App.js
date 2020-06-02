import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Topic } from './components/Topic';
import { Post } from './components/Post';
import { Member } from './components/Member';
import { Profile } from './components/Profile';
import {Register} from './components/Register';
import {Head} from './components/More/Head';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Head />
        
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/topic' component={Topic} />
          <Route path='/post' component={Post} />
          <Route path='/profile' component={Profile} />
          <Route path='/member' component={Member} />

        
      </Layout>
    );
  }
}
