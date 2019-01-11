import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import cart from './cart.js';

function validateItem(item){
    //TODO:: validate itme
    return true;
}

Meteor.methods({
    
    'insert-item'(item){
        validateItem(item);
        return cart.insert({
            name: name,
            img: img,
            desc: desc,
            userId: Meteor.userId(),
            status: 'added',
            createdAt: new Date(),
        });
    },
    'remove-item'(itemId, item){
        check(itemId, Number);
        item.status = 'removed';
        return cart.update(itemId, item);
    },
    'update-item'(itemId, newObj){
        check(itemId, Number);
        return items.update(itemId, newObj);
    },
    'get-total-count'(){

    }


});