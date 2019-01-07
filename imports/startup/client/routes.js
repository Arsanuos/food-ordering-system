import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router' 
import {mount} from 'react-mounter';

import App from '../../ui/layouts/app/App.js';

import Sign from '../../ui/pages/sign-in/Sign.js';
import Home from '../../ui/pages/home/Home.js'

Meteor.startup(() => {
  FlowRouter.go('Home');
});

FlowRouter.route('/', {
  name: 'Home',
  action(){
    if(Meteor.userId() == undefined){
      FlowRouter.go('SignIn');
    } else {
      mount(App , {page: <Home />,
                  showNav: true});
    }
  }    
});

FlowRouter.route('/SignIn', {
  name: 'SignIn',
  action() {
    mount(App , {page: <Sign/>, showNav:false});
  }
})
