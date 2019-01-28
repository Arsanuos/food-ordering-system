import {Menu} from '../Menu/Menu.js';
import {Orders} from '../orders/Orders.js';
import {Settings} from '../settings/Settings.js';
import {Meteor} from 'meteor/meteor';

export default class CollectionFactory {

    get(collectionName){
        if(collectionName == 'menu'){
            return Menu;
        }else if(collectionName == 'orders'){
            return Orders;
        }else if(collectionName == 'settings'){
            return Settings;
        }else if(collectionName == 'users'){
            return Meteor.users;
        }
    }
}