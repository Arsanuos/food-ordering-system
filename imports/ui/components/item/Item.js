import React, { Component } from 'react';
import './item.css';

export default class Item extends Component {

    render() {
        return(
        <div className="row">
            <div className="col-md-7">
            <a href="#">
                <img className="img-fluid" src={this.props.img} alt="" />
            </a>
            </div>
            <div className="col-md-5">
                <h3>{this.props.name}</h3>
                <p>{this.props.description}</p>
                <a className="btn btn-primary" href="#">View Project</a>
            </div>
        </div>
        );
    }
}
