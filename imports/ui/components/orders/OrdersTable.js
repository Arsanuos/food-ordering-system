import React, {Component} from 'react';

export default class OrdersTable extends Component {

    render() {
        let computedWidth = 100/(4 - 1) + " %";
        let data = this.props.data;
        return(
            <React.Fragment>
                <TableHeaderColumn dataField='_id' 
                    width={computedWidth} isKey={true} dataSort={true} hidden autoValue>Id</TableHeaderColumn>
            
                <TableHeaderColumn dataField='name' 
                    width={computedWidth} dataSort={true}>Name</TableHeaderColumn>
                
                <TableHeaderColumn dataField={name} width={computedWidth} dataSort={true} 
                    editable={ { type: 'select', options: { values: this.props.menuPlatesNames } } }>Plate Name</TableHeaderColumn>

                <TableHeaderColumn dataField='delivered' dataSort={true}
                    editable={ { type: 'checkbox', options: { values: 'Yes:No' } } }>Delivered</TableHeaderColumn>
            </React.Fragment>
        )
    }
}