import {Settings} from './Settings.js';
import { Meteor } from 'meteor/meteor';
import check from 'meteor/check';

Meteor.methods({
    'settings.add'(item){
        return Settings.insert(item);
    },
    'settings.remove'(itemId){
        return Settings.remove(itemId);
    },
    'settings.update'(itemId, item){
        return Settings.update(itemId, item);
    }
});
