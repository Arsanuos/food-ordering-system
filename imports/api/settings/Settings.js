import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Settings = new Mongo.Collection('settings');

Settings.schema = new SimpleSchema({
    _id: String,
   place: String,
}, { requiredByDefault: false, check});


export const interface = {
   insert: function(){
       return 'settings.add';
   },
   delete: function(){
       return 'settings.remove';
   },
   update: function(){
       return 'settings.update';
   }
}
