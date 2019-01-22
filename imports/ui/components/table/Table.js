import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './table.css';
import Meteor from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import CollectionFactory from '../../../api/factory/Factory.js';


class Table extends Component {
    

    constructor(props) {
        super(props);
        this.collection = this.props.collection;
        this.validator = this.props.validator.newContext();
        this.database = this.props.database;
        this.cellEditProp = {
            exportCSVText: 'Export',
            insertText: 'New Row',
            deleteText: 'Delete Row',
            mode: 'click',
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell
        };
        
        this.options = {
            handleConfirmDeleteRow: this.customConfirm,
            beforeInsertRow: this.beforeInsertRow,
            page: 2,  // which page you want to show as default
            sizePerPageList: [ {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: '15', value: 15
            }, {
                text: '20', value: 20
            } , {
                text: 'All', value: this.collection.find().count()
            } ], // you can change the dropdown list for size per page
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };
        this.exportToPDF = this.exportToPDF.bind(this);
        this.renderShowsTotal = this.renderShowsTotal.bind(this);
        this.onBeforeSaveCell = this.onBeforeSaveCell.bind(this);
        this.beforeInsertRow = this.beforeInsertRow.bind(this);
        this.customConfirm = this.customConfirm.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.containsData = this.containsData.bind(this);

        this.state = {
            pageSize: this.options.sizePerPage,
            currentPage: 1,
            totalDataSize: this.collection.find({}).count(),
        };
    }
    
    
    renderShowsTotal(start, to, total) {
        return (
          <p style={ { color: 'blue' } }>
            Rows from { start } to { to }
          </p>
        );
    }
    
    
    onBeforeSaveCell(row, cellName, cellValue) {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        if(this.validator.isValid()){
            Meteor.call(database.update(), row);
            return true;
        }
        return false;
    }
    
    beforeInsertRow(row) {
        if(this.validator.isValid(row)){
            Meteor.call(database.insert(), row);
            return true;
        }
        return false;
    }
      
    customConfirm(next, dropRowKeys) {
        if (confirm('Are you sure you want to remove this/these item(s)?')) {
            // If the confirmation is true, call the function that
            // continues the deletion of the record.
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
        if(this.containsData()){
            return Object.keys(collection.findOne())
        }
        return [];
    }



    render() {
        let columns = this.getColumns();
        let computedWidth = 100 / (columns.length - 1) + "%";
        let data = this.props.data;
        if(columns.length){
            return (
                <div style="h1">
                    No data found.
                </div>
            )
        }else{

            return(
                <React.Fragment>
                    <BootstrapTable data={data} cellEdit={ this.cellEditProp } striped={true} hover={true} height='700'
                        scrollTop={ 'Bottom' } pagination search deleteRow={ true } 
                        selectRow={ { mode: 'checkbox' } } insertRow={ true } exportCSV={ true }
                        hover options={ this.options } keyField='id'>
                            {
                                columns.map(function(name, index) {
                                    if(name == 'id'){
                                        return <TableHeaderColumn key={index} dataField={name} 
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
}

export default withTracker((props) => {
    //Meteor.subscribe('Menu');
    let collection = new CollectionFactory().get(props.collectionName);
    return {
      data: collection.find({}).fetch(),
      collection: collection,
    };
})(Table);


