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


import { Menu as MenuCollection, interface as MenuInterface } from '../../api/Menu/Menu.js';
import { Orders as OrdersCollection, interface as OrdersInterface} from '../../api/orders/Orders.js';


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
    mount(App, {page: <Settings />, showNav:true})
  }
})

FlowRouter.route('/*', {
  action() {
    mount(App, {page: <NotFound />});
  }
})
