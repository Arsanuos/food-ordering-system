import React, {Component} from 'react';
import Nav from '../../components/nav/Nav.js';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

export default class App extends Component {

    constructor(props){
        super(props);
        this.customRender = this.customRender.bind(this);
    }

    customRender() {
        const {page} = this.props;
        if(this.props.showNav){

            return(
                <React.Fragment>
                    <Nav />
                    {page}
                </React.Fragment>
                );
        }
        return (
            <React.Fragment>
                {page}
            </React.Fragment>
        );
    }

    render(){
        return (
            <React.Fragment>
                {this.customRender()}
            </React.Fragment>
        );
    }
}


Tracker.autorun(() => {
    if(Meteor.userId() != null){
        return;
    }
    FlowRouter.go('SignIn');
});