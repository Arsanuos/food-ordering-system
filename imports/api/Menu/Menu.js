import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

SimpleSchema.defineValidationErrorTransform(error => {
   const ddpError = new Meteor.Error(error.message);
   ddpError.error = 'validation-error';
   ddpError.details = error.details;
   return ddpError;
 });

export const Menu = new Mongo.Collection('menu');

Menu.schema = new SimpleSchema({
   id: {
      type: SimpleSchema.Integer,
      required: true,
   },
   name: String,
   price: Number,
}, { requiredByDefault: false, check});


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


