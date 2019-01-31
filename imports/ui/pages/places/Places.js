import React, {Component} from 'react';
import Table from '../../components/table/Table';
import { withTracker } from 'meteor/react-meteor-data';

class Places extends Component {

    render() {
        if(!this.props.isAdmin){
            FlowRouter.go('Home');
        }
        let database = this.props.database;
        let validator = this.props.validator;
        let collectionName = this.props.collectionName;
        return(
            <React.Fragment>
                <Table collectionName={collectionName} database={database} validator={validator}></Table>
            </React.Fragment>
        )
    }
}

export default withTracker((props) => {

    return {
        isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin', 'default-group'),
        isUser: Roles.userIsInRole(Meteor.userId(), 'user', 'default-group'),
        isWorker: Roles.userIsInRole(Meteor.userId(), 'worker', 'default-group'),
    }
})(Places);