import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class MenuTable extends Component{

    render(){
        let computedWidth = 100/(3 - 1) + " %";
        let data = this.props.data;
        let cellEditProp = this.props.cellEditProp
        let rowClassNameFormat = this.props.rowClassNameFormat;
        let options = this.props.options;
        return (
            <BootstrapTable data={data} cellEdit={ cellEditProp } striped={true} hover={true} height='700'
                    scrollTop={ 'Bottom' } pagination search deleteRow={ this.props.isWorker } 
                    selectRow={ this.props.isWorker ? { mode: 'checkbox' } : {} } insertRow={ this.props.isWorker } exportCSV={ true }
                    hover options={ options } keyField='_id' trClassName={rowClassNameFormat}>    
                    
                    <TableHeaderColumn dataField='_id' 
                        width={computedWidth} dataSort={true} hidden autoValue>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' 
                        width={computedWidth} isKey={false} editable={this.props.isWorker} dataSort={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'
                        width={computedWidth} isKey={false} editable={this.props.isWorker} dataSort={true}>Price</TableHeaderColumn>
        
            </BootstrapTable>
        );
    }
}

export default withTracker((props) => {

    return {
        isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin', 'default-group'),
        isUser: Roles.userIsInRole(Meteor.userId(), 'user', 'default-group'),
        isWorker: Roles.userIsInRole(Meteor.userId(), 'worker', 'default-group'),
    }
})(MenuTable);