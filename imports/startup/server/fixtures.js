// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Menu } from '../../api/Menu/Menu.js';

Meteor.startup(() => {

    Meteor.publish('Menu', function menuPublication() {
        return Menu.find();
    });
});
