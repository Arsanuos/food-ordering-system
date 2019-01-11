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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Store</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                  aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ">
                  <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/menu">Menu</a>
                  </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
                      role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        SignIn as {username}
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" >
                        <a className="dropdown-item" href="/settings">Settings</a>
                        <a className="dropdown-item" href="/mycart">Purchases</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="" onClick={this.logout}>Logout</a>
                      </div>
                    </li>
                </ul>
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