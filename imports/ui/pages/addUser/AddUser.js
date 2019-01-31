import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import CollectionFactory from '../../../api/factory/Factory.js';
import {Meteor} from 'meteor/meteor';
import Alert from 'react-s-alert';

class AddUser extends Component {

    constructor(props){
        super(props);
        this.renderPlacesOptions = this.renderPlacesOptions.bind(this);
        this.save = this.save.bind(this);
        this.renderAllRoles = this.renderAllRoles.bind(this);
        this.showError = this.showError.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.handleOnChangeRole = this.handleOnChangeRole.bind(this);
        this.state = {
            currentPlace: null,
            role: null,
            defaultRole: 'user',
        }
    }

    save() {
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;
        let userName = this.refs.userName.value;
        let currentPlace = this.refs.currentPlace.value;
        let role = this.refs.roles.value;
        if(password == confirmPassword){
            let user = {
                username:userName,
                password:password,
                profile:{
                    placeName: currentPlace,
                },
            };
            Meteor.call('users.add', user, role, (err, data) => {
                if(err){
                    this.showError("can't create user.")        
                    return;
                }
                this.showSuccess("User created successfully.");
            });
        } else {
            this.showError("can't create user.")
        }
    }

    handleOnChangeRole(){
        this.setState({
            defaultRole: this.refs.roles.value,
        })
    }

    showSuccess(msg) {
        Alert.success(msg, {
            position: 'top-right',
            effect: 'slide',
            timeout: 5000
        });
    }

    showError(msg){
        Alert.error(msg, {
            position: 'top-right',
            effect: 'slide',
            timeout: 5000
        });
    }

    renderPlacesOptions(){
        //Roles.createRole('user');
        return this.props.data.map((place, index) => {
            return (<option key={index} value={place.PlaceName}>{place.PlaceName}</option>);
        })
    }

    renderAllRoles() {
        return this.props.roles.map((role, index) => {
            return (<option key={index} value={role.name}>{role.name}</option>);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="Name">User Name</label>
                            <input type="text" className="form-control" ref='userName'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" ref="password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" className="form-control" ref="confirmPassword"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Name">Role</label>
                            <select className="form-control" ref='roles' value={this.state.defaultRole} onChange={this.handleOnChangeRole}>
                                {
                                    this.renderAllRoles()
                                }
                            </select>
                        </div>
                        <div className="form-group" hidden={(this.state.defaultRole == 'worker') ? true : false}>
                            <label htmlFor="Name">Choose place name</label>
                            <select className="form-control" ref='currentPlace'>
                                {
                                    this.renderPlacesOptions()
                                }
                            </select>
                        </div>
                        <button className="btn btn-success btn-lg pull-right" onClick={this.save}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTracker((props) => {
    Meteor.subscribe(props.collectionName);
    let collection = new CollectionFactory().get(props.collectionName);
    return {
      data: collection.find({}).fetch(),
      isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin', 'default-group'),
      isUser: Roles.userIsInRole(Meteor.userId(), 'user', 'default-group'),
      roles: Roles.getAllRoles({}).fetch(),
    };
})(AddUser);