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

export const schema = new SimpleSchema({
   id: {
      type: SimpleSchema.Integer,
      required: true,
   },
   name: String,
   price: SimpleSchema.Integer
}, { requiredByDefault: false, check});