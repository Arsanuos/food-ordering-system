import React, {Component} from 'react';

export default class MenuTable extends Component{

    render(){
        let computedWidth = 100/(3 - 1) + " %";
        let data = this.props.data;
        let cellEditProp = this.props.cellEditProp
        let rowClassNameFormat = this.props.rowClassNameFormat;
        let options = this.props.options;
        return (
            <BootstrapTable data={data} cellEdit={ cellEditProp } striped={true} hover={true} height='700'
                    scrollTop={ 'Bottom' } pagination search deleteRow={ true } 
                    selectRow={ { mode: 'checkbox' } } insertRow={ true } exportCSV={ true }
                    hover options={ options } keyField='_id' trClassName={rowClassNameFormat}>    
                    
                    <TableHeaderColumn dataField='_id' 
                        width={computedWidth} dataSort={true} hidden autoValue>Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' 
                        width={computedWidth} isKey={false} dataSort={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'
                        width={computedWidth} isKey={false} dataSort={true}>Price</TableHeaderColumn>
        
            </BootstrapTable>
        );
    }
}