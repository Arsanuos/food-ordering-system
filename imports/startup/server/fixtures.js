// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Menu } from '../../api/Menu/Menu.js';
import { Orders } from '../../api/orders/Orders.js';
import { Settings } from '../../api/settings/Settings.js';

Meteor.startup(() => {

    Meteor.publish('menu', function menuPublication() {
        return Menu.find();
    });

    Meteor.publish('orders', function ordersPublication() {
        return Orders.find();
    });

    Meteor.publish('settings', function settingsPublication() {
        return Settings.find();
    });
});
