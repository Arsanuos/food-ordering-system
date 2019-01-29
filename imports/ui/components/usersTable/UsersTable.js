import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';

export default class UsersTable extends Component {

    constructor(props){
        super(props);
        this.addAdminColumnToData = this.addAdminColumnToData.bind(this);
    }

    addAdminColumnToData(data) {
        Meteor.subscribe('roles');
        return data.map((row) => {
            if(Roles.userIsInRole(row['_id'], ['admin'], 'default-group')){
                row.admin = 'Yes';
            }else{
                row.admin = 'No';
            }
            return row;
        });        
    }

    render() {
        let computedWidth = 100/(3 - 1) + " %";
        let data = this.addAdminColumnToData(this.props.data);
        let cellEditProp = this.props.cellEditProp
        let rowClassNameFormat = this.props.rowClassNameFormat;
        let options = this.props.options;
        return(
            <BootstrapTable data={data} cellEdit={ cellEditProp } striped={true} hover={true} height='700'
                    scrollTop={ 'Bottom' } pagination search deleteRow={ true } 
                    selectRow={ { mode: 'checkbox' } } insertRow={ true } exportCSV={ true }
                    hover options={ options } keyField='_id' trClassName={rowClassNameFormat}> 
                    
                    <TableHeaderColumn dataField='_id' 
                        width={computedWidth} isKey={false} dataSort={true} hidden autoValue>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='username' width={computedWidth} dataSort={true} editable={{readOnly:true}}>User Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='admin' dataSort={true} width={computedWidth}
                            editable={ { type: 'checkbox', options: { values: 'Yes:No' } } }>Admin</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}