import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router' 

class Nav extends Component {

    constructor(props){
      super(props);
      this.logout = this.logout.bind(this);
    }


    logout(){
      Meteor.logout();
      FlowRouter.go('SignIn', (error) => {
        if(error == undefined){
          FlowRouter.go("SignIn");
        }
      });
    }

    render() {
        let {currentUser} = this.props;
        let username = '';
        if(currentUser != undefined){
          username = currentUser.username;
        }
        return (
            <nav className="navbar navbar-default navbar-static-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" 
                data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">Home</a>
              </div>
          
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li><a href="foods">Food Menu </a></li>
                  <li><a href="drinks">Drinks</a></li>
                </ul>
                <form className="navbar-form navbar-left">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search Menu"/>
                  </div>
                  <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#"></a></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" 
                    role="button" aria-haspopup="true" aria-expanded="false">Signed in as {username} <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="settings">Settings</a></li>
                      <li><a href="purchases">Purchases</a></li>
                      <li><a href="" onClick={this.logout}>Logout</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
    }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Nav);