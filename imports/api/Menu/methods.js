import {Menu} from './Menu.js';
import { Meteor } from 'meteor/meteor';
import check from 'meteor/check';

Meteor.methods({
    'menu.add'(item){
        return Menu.insert(item);
    },
    'menu.remove'(itemId){
        return Menu.remove(itemId);
    },
    'menu.update'(itemId, item){
        return Menu.update(itemId, item);
    }
});
