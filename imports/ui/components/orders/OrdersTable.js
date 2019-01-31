import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class OrdersTable extends Component {

    constructor(props){
        super(props);
        this.currentDate = this.currentDate.bind(this);
    }

    currentDate(cell, row){
        console.log(row);
        if(!cell){

            let currentdate = new Date(); 
            let datetime =  currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
            return datetime;
        }
        return cell; 
    }


    render() {
        let computedWidth = 100/(4 - 1) + " %";
        let data = this.props.data;
        let cellEditProp = this.props.cellEditProp
        let rowClassNameFormat = this.props.rowClassNameFormat;
        let options = this.props.options;
        let menuPlatesNames = this.props.menuPlatesNames;
        return(
            <BootstrapTable data={data} cellEdit={ cellEditProp } striped={true} hover={true} height='700'
                    scrollTop={ 'Bottom' } pagination search deleteRow={this.props.isWorker ? false : true } 
                    selectRow={ this.props.isWorker ? {} : { mode: 'checkbox' } } insertRow={this.props.isWorker ? false: true} exportCSV={ true }
                    hover options={ options } keyField='_id' trClassName={rowClassNameFormat} defaultSorted={[{id: "delivered", desc: true}]}> 
                    
                    <TableHeaderColumn dataField='_id' 
                        width={computedWidth} isKey={false} dataSort={true} hidden autoValue>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' width={computedWidth} dataSort={true} 
                            editable={ { type: 'select', options: { values: menuPlatesNames }, readOnly:this.props.isWorker } }>Plate Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='createdAt' 
                        width={computedWidth} editable={{type: 'text', readOnly:true}}
                         isKey={false} dataSort={true} hiddenOnInsert>Created At</TableHeaderColumn>
                    {this.props.isWorker ? (
                        <TableHeaderColumn dataField='place' width={computedWidth} dataSort={true} 
                            editable={ {readOnly:true} }>Place</TableHeaderColumn>
                    ) : (
                        null
                    )

                    }
                    <TableHeaderColumn dataField='delivered' dataSort={true} width={computedWidth}
                            editable={ { type: 'checkbox', options: { values: 'Yes:No' } } }>Delivered</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default withTracker((props) => {

    return {
        isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin', 'default-group'),
        isUser: Roles.userIsInRole(Meteor.userId(), 'user', 'default-group'),
        isWorker: Roles.userIsInRole(Meteor.userId(), 'worker', 'default-group'),
    }
})(OrdersTable);