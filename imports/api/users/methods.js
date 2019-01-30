import {Meteor} from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
    'users.add'(user, role){
        let userid = Accounts.createUser(user);
        Roles.addUsersToRoles(userid, role, 'default-group');
        return userid;
    },
    'users.promote'(userid, role){
        Roles.addUsersToRoles(userid, role, 'default-group');
    },
    'users.update-settings'(userid, newsettings){
        let role = newsettings.role;
        Roles.setUserRoles(userid, role, 'default-group');
        //Roles.addUsersToRoles(userid, role, 'default-group');
        //let prevRole = role == 'admin' ? 'worker' : 'admin';
        //Roles.removeUsersFromRoles(userid, prevRole, 'default-group');
    },
    'users.remove'(userId){
        Meteor.users.remove(userId);
    },
    'users.update-place'(userId, newSettings){
        Meteor.users.update(userId, {$set:{
            'profile':newSettings,
        }});
    }
});
