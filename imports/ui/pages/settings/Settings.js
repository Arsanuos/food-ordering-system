import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import CollectionFactory from '../../../api/factory/Factory.js';

import Alert from 'react-s-alert';

class Settings extends Component {

    constructor(props){
        super(props);
        this.renderPlacesOptions = this.renderPlacesOptions.bind(this);
        this.save = this.save.bind(this);
        this.renderPlaceChooser = this.renderPlaceChooser.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.state = {
            currentPlace: this.props.currentPlace,
        }
    }

    handleSelectChange() {
        //change place.
        let val = this.refs.placeName.value;
        let profile = this.props.userData.profile;
        profile.placeName = val;
        Meteor.call('users.update-place', Meteor.userId(), profile);
        Alert.success("Your new place is " + val, {
            position: 'top-right',
            effect: 'slide',
            timeout: 5000
        });
    }

    showMessage(msg){
        Alert.success(msg, {
            position: 'top-right',
            effect: 'slide',
            timeout: 5000
        }); 
    }

    save(){
        //change password.
        let oldPassword = this.refs.oldPassword.value;
        let newPassword = this.refs.newPassword.value;
        let confirmNewPassword = this.refs.confirmNewPassword.value;
        if(newPassword == confirmNewPassword){
            Accounts.changePassword(oldPassword, newPassword, (error) => {
                if(error == undefined){
                    this.showMessage("Password changed.")
                }else{
                    this.showMessage("Kindly check you old password.");
                }
            })
        }else{
            this.showMessage('Your new password and your old password isn\'t identical.')
        }
    }

    renderPlacesOptions(){
        console.log(this.props.userData);
        return this.props.data.map((place, index) => {
            return (<option key={index} value={place.PlaceName}>{place.PlaceName}</option>);
        })
    }

    getCurrentPlace(){
        let currentPlace = undefined;
        this.props.data.forEach(element => {
            if(element.PlaceName == this.props.userData.profile.placeName){
                currentPlace = element.PlaceName;
            }
        });
        return currentPlace;
    }

    renderPlaceChooser(){
        if(this.props.isAdmin || this.props.isUser){
            let currentPlace = this.getCurrentPlace();
            return(
                <div className="row">
                    <div className="form-group col-sm-12">
                        <label htmlFor="Name">Choose place name</label>
                        <select className="form-control" ref='placeName' value={currentPlace} onChange={this.handleSelectChange}>
                            {
                                this.renderPlacesOptions()
                            }
                        </select>
                    </div>
                    <div className="col-sm-12 form-group">
                        <label htmlFor="password">Old Password</label>
                        <input type="password" className="form-control" ref='oldPassword'/>
                    </div>
                    <div className="col-sm-12 form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" className="form-control" ref='newPassword'/>
                    </div>
                    <div className="col-sm-12 form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" ref='confirmNewPassword'/>
                    </div>
                    <div className="col-sm-12 form-group">
                        <input type="button" name="save"
                            className="btn btn-success btn-lg col-md-3 col-md-offset-9" 
                            value="Save" onClick={this.save}/>
                    </div>
                </div>
            );
        }
        return;
    }

    render(){
        return(
            <div className="container">
                {
                    this.renderPlaceChooser()
                }
            </div>
        );
    }
}

export default withTracker((props) => {
    Meteor.subscribe(props.collectionName);
    let collection = new CollectionFactory().get(props.collectionName);
    let userData = Meteor.users.findOne({'_id':Meteor.userId()});
    let currentPlace = undefined;
    if(userData != undefined){
        currentPlace = userData.profile.placeName;
    }
    return {
      data: collection.find({}).fetch(),
      isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin', 'default-group'),
      isUser: Roles.userIsInRole(Meteor.userId(), 'user', 'default-group'),
      userData: Meteor.users.findOne({'_id':Meteor.userId()}),
      currentPlace: currentPlace,
    };
})(Settings);