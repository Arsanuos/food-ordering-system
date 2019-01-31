// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Menu } from '../../api/Menu/Menu.js';
import { Orders } from '../../api/orders/Orders.js';
import { Settings } from '../../api/settings/Settings.js';

Meteor.startup(() => {

    let rolesCount = Roles.getAllRoles({}).count();
    if(rolesCount == 0){
        Roles.createRole('user');
        Roles.createRole('admin');
        Roles.createRole('worker');
    }

    let usersCount = Meteor.users.find({}).count();
    if(usersCount == 0){
        let user = {
            username: 'admin',
            password: 'admin',
            profile: {
                placeName: "",
            }
        }
        let userid = Accounts.createUser(user);
        Roles.addUsersToRoles(userid, 'admin', 'default-group');
    }

    Meteor.publish('menu', function menuPublication() {
        return Menu.find();
    });
    
    Meteor.publish('orders', function ordersPublication() {
        if(Roles.userIsInRole(Meteor.userId(), 'worker', 'default-group')){
            return Orders.find({}, {sort:{delivered:1}});
        }
        return Orders.find({'userId':Meteor.userId()}, {sort:{delivered:1}});
    });
    
    Meteor.publish('settings', function settingsPublication() {
        return Settings.find();
    });
    
    Meteor.publish('users', function usersPublication() {
        //return Meteor.users.find();
        return Meteor.users.find({}, {fields:{'_id':1, 'username':1, 'profile':1, 'roles':1}});
    })
    
    Meteor.publish(null, function (){
        return Meteor.roles.find()
    })

});

