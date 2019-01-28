import {Meteor} from 'meteor/meteor';
import { check } from 'meteor/check';


Meteor.methods({
    'users.add'(user, settings){
        Accounts.createUser({
            username: user.username,
            password: user.password,
        });
        
    },
    'users.promote'(userid, role){
        Roles.addUsersToRoles(userid, role, 'default-group');
    },
    'users.update-settings'(userid, newsettings){
        let role = newsettings.admin == 'Yes' ? 'admin' : 'worker';
        let prevRole = role == 'admin' ? 'worker' : 'admin';
        Roles.addUsersToRoles(userid, role, 'default-group');
        Roles.removeUsersFromRoles(userid, prevRole, 'default-group');
    },
    'users.remove'(userId){
        Meteor.users.remove(userId);
    }
});
