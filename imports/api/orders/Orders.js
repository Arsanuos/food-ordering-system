import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

SimpleSchema.defineValidationErrorTransform(error => {
   const ddpError = new Meteor.Error(error.message);
   ddpError.error = 'validation-error';
   ddpError.details = error.details;
   return ddpError;
 });

export const Orders = new Mongo.Collection('orders');

Orders.schema = new SimpleSchema({
    _id: String,
   name: String,
   price: Number,
   createdAt: Date,
   delivered: Boolean,
}, { requiredByDefault: false, check});


export const interface = {
   insert: function(){
       return 'orders.add';
   },
   delete: function(){
       return 'orders.remove';
   },
   update: function(){
       return 'orders.update';
   },
   markAsDelivered: function() {
       return 'orders.delivered';
   }
}


