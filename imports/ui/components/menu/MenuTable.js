import React, {Component} from 'react';

export default class MenuTable extends Component{

    render(){
        let computedWidth = 100/(3 - 1) + " %";
        let data = this.props.data;
        return (
            <React.Fragment>
                <TableHeaderColumn dataField='_id' 
                    width={computedWidth} isKey={true} dataSort={true} hidden autoValue>Id</TableHeaderColumn>
                <TableHeaderColumn dataField='name'
                    width={computedWidth} dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='price'
                    width={computedWidth} dataSort={true}>Price</TableHeaderColumn>
            </React.Fragment>
        );
    }
}