import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const menu = new Mongo.Collection('menu');

export const schema = new SimpleSchema({
   name: String,
   img: String,
   description: String,
});