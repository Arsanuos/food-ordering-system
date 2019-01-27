import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import CollectionFactory from '../../../api/factory/Factory.js';

class Settings extends Component {

    constructor(props){
        super(props);
    }

    renderPlacesOptions(){
        return this.props.data.map((place) => {
            return <option>place</option>
        })
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                        <div>
                            <div className="form-group">
                                <select className="form-control">
                                    {
                                        this.renderPlacesOptions()
                                    }
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <div className="row">
                                    <input type="button" style={{marginTop:150}} name="save" id="login-submit" 
                                        className="btn btn-success btn-lg col-md-3 col-md-offset-9" 
                                    value="Save" onClick={this.login}/>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTracker((props) => {
    Meteor.subscribe(props.collectionName);
    let collection = new CollectionFactory().get(props.collectionName);
    return {
      data: collection.find({}).fetch(),
    };
})(Settings);