import Menu from './Menu.js';
import Meteor from 'meteor/meteor';
import check from 'meteor/check';

Meteor.methods({
    'add-to-menu'(item){
        Menu.insert(item);
    },
    'remove-from-menu'(itemId){
        Menu.remove(itemId);
    },
    'update-item'(itemId, item){
        Menu.update(itemId, item);
    },
    'fetch'(start, end, N){
        return Menu.find().skip(end - start + 1).limit(N);
    },
    'count'(){
        return Menu.count();
    }
});


export const interface = {
    insert: function(){
        return 'add-to-menu';
    },
    delete: function(){
        return 'remove-from-menu';
    },
    update: function(){
        return 'update-item';
    },
    fetch: function(){
        return 'fetch';
    },
    count: function(){
        return 'count';
    }
}