import React, {Component} from 'react';
import Nav from './components/Nav.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const products = [{
    id: 1,
    name: "Item name 1",
    price: 100
},{
    id: 2,
    name: "Item name 2",
    price: 100
},{
    id: 3,
    name: "Item name 2",
    price: 100
},{
    id: 4,
    name: "Item name 2",
    price: 100
}];

function onBeforeSaveCell(row, cellName, cellValue) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return false;
}

const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: onBeforeSaveCell
  };

function customConfirm(next, dropRowKeys) {
    const dropRowKeysStr = dropRowKeys.join(',');
    if (confirm('Are you sure you want to remove this item?')) {
        // If the confirmation is true, call the function that
        // continues the deletion of the record.
        next();
    }
}

const options = {
    handleConfirmDeleteRow: customConfirm,
};

export default class CustomTable extends Component {
    
    constructor(props) {
        super(props);
        this.exportToPDF = this.exportToPDF.bind(this);
    }

    exportToPDF() {
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(Object.keys(products), products, {
            styles: {fillColor: [100, 255, 255]},
            columnStyles: {
                id: {fillColor: 255}
            },
            margin: {top: 60},
            addPageContent: function(data) {
                doc.text("Header", 40, 30);
            }
        });
        doc.save('table.pdf');
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                FlowRouter.go('/login');
            }else{
                FlowRouter.go('/');
            }
        });
        firebase.database().ref(this.props.collection).once('value').then(function(snapshot) {
            this.setState({
                data:snapshot
            })
        });
    }


    render() {
        let computedWidth = 100 / this.props.columns.size() + "%";
        return(
            <div>
                <Nav></Nav>
                <button onClick={this.exportToPDF}>pdf</button>
                <BootstrapTable id="testTable" data={this.state.data} cellEdit={ cellEditProp } striped={true} hover={true} height='700'
                 scrollTop={ 'Bottom' } pagination search deleteRow={ true } 
                 selectRow={ { mode: 'checkbox' } } exportCSV={ true } insertRow={ true } multiColumnSearch={ true }
                 hover options={ options }>
                    <TableHeaderColumn dataField="id" width={computedWidth} isKey={true} dataAlign="right" dataSort={true} hidden autovalue>رقم</TableHeaderColumn>
                    {
                        this.props.columns.map((name) => {<TableHeaderColumn dataField="name" width={computedWidth} dataSort={true} dataAlign="right" >name</TableHeaderColumn>})
                    }
                </BootstrapTable>
            </div>
        );
    }
}
