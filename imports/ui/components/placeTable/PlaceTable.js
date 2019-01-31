import React, {Component} from 'react';


export default class PlaceTable extends Component {

    constructor(props){
        super(props);
    }

    placeNameValidator(value, row){
        if (!value) {
            return 'Place is required.';
        }
        return true;
    }

    render(){
        let computedWidth = 100/(2 - 1) + " %";
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
                    <TableHeaderColumn dataField='PlaceName' 
                        width={computedWidth} isKey={false} dataSort={true} editable={{validator:this.placeNameValidator}}>Place Name</TableHeaderColumn>

            </BootstrapTable>
        );
    }
}