import React, {Component} from 'react';
import './sign.css';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router' 

import Alert from 'react-s-alert';

export default class Sign extends Component {

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }
    

    login(e){
        e.preventDefault();
        let userNameVar = this.refs.userNameLog.value;
        let passVar = this.refs.passLog.value;
        Meteor.loginWithPassword(userNameVar, passVar, (error) => {
            if(error == undefined){
                FlowRouter.go('Home');
            }else{
                Alert.success("Can't login user and password may be incorrect.", {
                    position: 'top-right',
                    effect: 'slide',
                    timeout: 5000
                });
            }
        });
    }
    
    render(){
        return (
        <div className="container" style={{paddingTop:90}}>
			<div className="col-md-6 col-md-offset-3">
                <div className="col-md-12">
                    <div className="panel panel-login">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-12">
                                    <a className="active" id="login-form-link">Login</a>
                                </div>
                            </div>
                            <hr/>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form id="login-form" role="form" style={{'display': 'block', 'padding': 25}}>
                                        <div className="form-group">
                                            <input type="text" name="username" id="userNameLog" tabIndex="1" 
                                            className="form-control" placeholder="Username" ref="userNameLog"/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="password" name="password" id="passwordLog" tabIndex="2" 
                                            className="form-control" placeholder="Password" ref="passLog"/>
                                        </div>
                                       
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-xs-6 col-xs-offset-3">
                                                    <input type="submit" name="login-submit" id="login-submit" 
                                                    tabIndex="4" className="form-control btn btn-login" 
                                                    value="Log In" onClick={this.login}/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}
