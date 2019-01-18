import Meteor from 'meteor/meteor';
import { check } from 'meteor/check';
import { Settings } from './settings.js';


Meteor.methods({
    'add-user'(user, settings){
        Accounts.createUser({
            username: user.username,
            password: user.password,
        });
        Settings.insert(settings);
    },
    'promote'(userid, role){
        if(role != 'admin' && role != 'worker'){
            Roles.addUsersToRoles(userid, role, 'default-group');
        }
    },
    'change-user-name'(user){
        Accounts.setUsername(user.userid, user.username);
    },
    'update-settings'(userid, newsettings){
        Settings.update(userid, newsettings);
    },
    'search'(username){
        return Meteor.users.findOne(username);
    },
    'fetch'(start, end, N){
        return Meteor.users.find().skip(end - start + 1).limit(N);
    }

});
