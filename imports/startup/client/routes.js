import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import App from '../../ui/layouts/app/App.js';
import Sign from '../../ui/pages/sign-in/Sign.js';
import Home from '../../ui/pages/home/Home.js';
import NotFound from '../../ui/pages/not-found/NotFound.js';
import Menu from '../../ui/pages/menu/Menu.js';
import Settings from '../../ui/pages/settings/Settings.js';
import Users from '../../ui/pages/users/Users.js';
import Places from '../../ui/pages/places/Places.js';
import AddUser from '../../ui/pages/addUser/AddUser.js';


import { Menu as MenuCollection, interface as MenuInterface } from '../../api/Menu/Menu.js';
import { Orders as OrdersCollection, interface as OrdersInterface} from '../../api/orders/Orders.js';
import { Settings as SettingsCollection, interface as SettingsInterface} from '../../api/settings/Settings.js';
import { interface as UsersInterface } from '../../api/users/Users.js';


Meteor.startup(() => {
  
});

FlowRouter.route('/' , {
  name: 'Home',
  action(){
    if(Meteor.userId() == undefined){
      FlowRouter.go('SignIn');
    } else {
      mount(App , {page: <Home collectionName={'orders'} database={OrdersInterface} validator={OrdersCollection.schema} />,
                  showNav: true});
    }
  }    
});

FlowRouter.route('/signIn', {
  name: 'SignIn',
  action() {
    if(Meteor.userId() != undefined){
      FlowRouter.go('Home');
      return;
    }
    mount(App , {page: <Sign/>, showNav:false});
  }
})

FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    mount(App, {page: <Menu collectionName={'menu'} database={MenuInterface} validator={MenuCollection.schema} />, showNav:true})
  }
})

FlowRouter.route('/settings', {
  name: 'settings',
  action() {
    mount(App, {page: <Settings collectionName={'settings'} database={SettingsInterface} validator={SettingsCollection.schema}/>, showNav:true})
  }
})


FlowRouter.route('/users', {
  name: 'users',
  action() {
    mount(App, {page: <Users collectionName={'users'} database={UsersInterface} validator={SettingsCollection.schema}/>, showNav:true})
  }
})

FlowRouter.route('/places', {
  name: 'users',
  action() {
    mount(App, {page: <Places collectionName={'settings'} database={SettingsInterface} validator={SettingsCollection.schema}/>, showNav:true})
  }
})

FlowRouter.route('/AddUser', {
  name: 'users',
  action() {
    mount(App, {page: <AddUser collectionName={'settings'} />, showNav:true})
  }
})

FlowRouter.route('/*', {
  action() {
    mount(App, {page: <NotFound />});
  }
})
