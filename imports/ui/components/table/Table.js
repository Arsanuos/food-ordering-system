import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './table.css';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import CollectionFactory from '../../../api/factory/Factory.js';


class Table extends Component {


    constructor(props) {
        super(props);
        this.collection = this.props.collection;
        
        let validator = this.props.validator;
        this.validator = validator;
        
        let database = this.props.database;;
        this.database = database;
        
        this.columns = Object.keys(this.props.validator.schema());
        
        this.cellEditProp = {
            exportCSVText: 'Export',
            insertText: 'New Row',
            deleteText: 'Delete Row',
            mode: 'click',
            blurToSave: true,
            afterSaveCell: function(row, cellName, cellValue) {
                Meteor.call(database.update(), row._id, row);
            }
        };

        this.options = {
            handleConfirmDeleteRow: this.customConfirm,
            afterInsertRow: this.onAfterInsertRow,   // A hook for after insert rows
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: '15', value: 15
            }, {
                text: '20', value: 20
            } ], // you can change the dropdown list for size per page
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            afterDeleteRow: this.onAfterDeleteRow,  // A hook for after droping rows.
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            database: database,
            validator: validator,
        };
        this.exportToPDF = this.exportToPDF.bind(this);
        this.renderShowsTotal = this.renderShowsTotal.bind(this);
        //this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
        this.onAfterInsertRow = this.onAfterInsertRow.bind(this);
        this.customConfirm = this.customConfirm.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.containsData = this.containsData.bind(this);
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);

        this.state = {
            currentPage: 1,
            totalDataSize: this.collection.find({}).count(),
        };
    }
    
    
    onAfterDeleteRow(rowId) {

    }

    renderShowsTotal(start, to, total) {
        return (
          <p style={ { color: 'blue' } }>
            Rows from { start } to { to }
          </p>
        );
    }

    
    onAfterInsertRow(row){
        Meteor.call(this.database.insert(), row);
    }
      
    customConfirm(next, dropRowKeys) {
        if (confirm('Are you sure you want to remove this/these item(s)?')) {
            // If the confirmation is true, call the function that
            // continues the deletion of the record.
            dropRowKeys.forEach((rowId) => {
                Meteor.call(this.database.delete(), rowId);
            })
            next();
        }
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

    containsData(){
        return this.collection.find({}).count() > 0 ? true : false;
    }

    getColumns(){
        return this.columns;
    }



    render() {
        let columns = this.getColumns();
        let computedWidth = 100 / (columns.length - 1) + "%";
        let data = this.props.data;
        return(
            <React.Fragment>
                <BootstrapTable data={data} cellEdit={ this.cellEditProp } striped={true} hover={true} height='700'
                    scrollTop={ 'Bottom' } pagination search deleteRow={ true } 
                    selectRow={ { mode: 'checkbox' } } insertRow={ true } exportCSV={ true }
                    hover options={ this.options } keyField='_id'>
                        {
                            columns.map(function(name, index) {
                                if(name == 'id'){
                                    return <TableHeaderColumn key={index} dataField='_id' 
                                    width={computedWidth} isKey={false} dataSort={true} hidden autoValue>{name}</TableHeaderColumn>
                                }
                                return <TableHeaderColumn key={index} dataField={name} 
                                width={computedWidth} isKey={false} dataSort={true}>{name}</TableHeaderColumn>
                            })
                        }
                    </BootstrapTable>
            </React.Fragment>
        );
    }
}

export default withTracker((props) => {
    Meteor.subscribe('Menu');
    let collection = new CollectionFactory().get(props.collectionName);
    return {
      data: collection.find({}).fetch(),
      collection: collection,
    };
})(Table);


