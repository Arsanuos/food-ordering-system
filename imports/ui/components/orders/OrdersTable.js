import React, {Component} from 'react';

export default class OrdersTable extends Component {

    constructor(props){
        super(props);
        this.currentDate = this.currentDate.bind(this);
    }

    currentDate(){
        let currentdate = new Date(); 
        let datetime =  currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
        return datetime; 
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
                    scrollTop={ 'Bottom' } pagination search deleteRow={ true } 
                    selectRow={ { mode: 'checkbox' } } insertRow={ true } exportCSV={ true }
                    hover options={ options } keyField='_id' trClassName={rowClassNameFormat}> 
                    
                    <TableHeaderColumn dataField='_id' style={{whiteSpace: 'nowrap'}}
                        width={computedWidth} isKey={false} dataSort={true} hidden autoValue>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' width={computedWidth} dataSort={true} style={{whiteSpace: 'nowrap'}} 
                            editable={ { type: 'select', options: { values: menuPlatesNames } } }>Plate Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='createdAt' style={{whiteSpace: 'nowrap'}}
                        width={computedWidth} editable={{type: 'text', defaultValue: this.currentDate()}}
                         isKey={false} dataSort={true}>Created At</TableHeaderColumn>
                    <TableHeaderColumn dataField='delivered' dataSort={true} width={computedWidth} style={{whiteSpace: 'nowrap'}}
                            editable={ { type: 'checkbox', options: { values: 'Yes:No' } } }>Delivered</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}