import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class UsersTable extends Component {

    constructor(props){
        super(props);
        this.addAdminColumnToData = this.addAdminColumnToData.bind(this);
        this.getRoles = this.getRoles.bind(this);
    }

    addAdminColumnToData(data) {
        Meteor.subscribe('roles');
        return data.map((row) => {
            console.log(row);
            let x = {};
            x.username = row.username;
            x._id = row._id;
            if(row.roles != undefined){
                x.role = row.roles['default-group'][0]
            }
            return x;
        });        
    }

    getRoles(){
        return this.props.roles.map((role, index) => {
            return role.name;
        })
    }

    render() {
        let computedWidth = 100/(3 - 1) + " %";
        let data = this.addAdminColumnToData(this.props.data);
        //let data = this.props.data;
        let cellEditProp = this.props.cellEditProp
        let rowClassNameFormat = this.props.rowClassNameFormat;
        let options = this.props.options;
        let roles = this.getRoles();
        return(
            <BootstrapTable data={data} cellEdit={ cellEditProp } striped={true} hover={true} height='700'
                    scrollTop={ 'Bottom' } pagination search deleteRow={ true } 
                    selectRow={ { mode: 'checkbox' } } exportCSV={ true }
                    hover options={ options } keyField='_id' trClassName={rowClassNameFormat}> 
                    
                    <TableHeaderColumn dataField='_id' 
                        width={computedWidth} isKey={false} dataSort={true} hidden autoValue>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='username' width={computedWidth} dataSort={true} editable={{readOnly:true}}>User Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='role' width={computedWidth} dataSort={true} 
                            editable={ { type: 'select', options: { values: roles } } }>Role Name</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default withTracker((props) => {
    return {
      roles: Roles.getAllRoles().fetch(),
    };
})(UsersTable);