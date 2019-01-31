import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router' 

class Nav extends Component {

    constructor(props){
      super(props);
      this.logout = this.logout.bind(this);
      this.renderAdmin = this.renderAdmin.bind(this);
    }


    logout(){
      Meteor.logout();
      FlowRouter.go('SignIn', (error) => {
        if(error == undefined){
          FlowRouter.go("SignIn");
        }
      });
    }

    renderAdmin(admin){
      if(Meteor.userId() && admin){
        return (<React.Fragment>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/users">ManageUsers</a>
          </React.Fragment>);

      }
    }

    render() {
        let {currentUser, admin} = this.props;
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
                <li><a href="/">My Orders</a></li> 
                <li><a href="menu">Menu </a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#"></a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" 
                  role="button" aria-haspopup="true" aria-expanded="false">Signed in as {username} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="settings">My Settings</a></li>
                    {this.props.isAdmin ?
                      (
                        <React.Fragment>
                          <li><a href="users">Users</a></li>
                          <li><a href="places">Places</a></li>
                          <li><a href="addUser">Create User</a></li>
                        </React.Fragment>
                      ) : (
                        null
                      )
                    }
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
    isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin', 'default-group'),
    isUser: Roles.userIsInRole(Meteor.userId(), 'user', 'default-group'),
    isWorker: Roles.userIsInRole(Meteor.userId(), 'worker', 'default-group'),
  };
})(Nav);