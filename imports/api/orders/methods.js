import {Orders} from './Orders.js';
import { Meteor } from 'meteor/meteor';
import check from 'meteor/check';

Meteor.methods({
    'orders.add'(item){
        return Orders.insert(item);
    },
    'orders.remove'(itemId){
        return Orders.remove(itemId);
    },
    'orders.update'(itemId, item){
        return Orders.update(itemId, item);
    },
    'orders.delivered'(itemId, item){
        item.delivered != item.delivered;
        return Orders.update(itemId, item);
    }
});
