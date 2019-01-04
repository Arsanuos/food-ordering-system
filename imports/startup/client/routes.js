import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import Sign from '../../ui/pages/sign-in/Sign.js';
 
Meteor.startup(() => {
  render(<Sign />, document.getElementById('root'));
});