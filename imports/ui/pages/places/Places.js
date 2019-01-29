import React, {Component} from 'react';
import Table from '../../components/table/Table';


export default class extends Component {

    render() {
        let database = this.props.database;
        let validator = this.props.validator;
        let collectionName = this.props.collectionName;
        return(
            <React.Fragment>
                <Table collectionName={collectionName} database={database} validator={validator}></Table>
            </React.Fragment>
        )
    }
}