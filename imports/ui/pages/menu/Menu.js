import React, { Component } from 'react';
import '../../components/item/item.css';
import Item from '../../components/item/Item.js';

export default class Item extends Component {

    render() {
        return(
        <div className="container">

            <h1 className="my-4">Page Heading
                <small>Secondary Text</small>
            </h1>

            <Item img={img} name={name} description={description}>
            <hr/>

            <ul className="pagination justify-content-center">
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
                </li>
                <li className="page-item">
                <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </a>
                </li>
            </ul>

        </div>
        );
    }
}
