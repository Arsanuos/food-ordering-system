import React, { Component } from 'react';

export default class Item extends Component {

    render() {
        //let {data} = this.props;
        let data = {};
        data.itemName = "hello";
        data.description = "sahflkjaslkhfkjlhajksdhlfksja";
        data.price = 50;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-2 col-md-2">
                    <img src="http://thetransformedmale.files.wordpress.com/2011/06/bruce-wayne-armani.jpg"
                        alt="" className="img-rounded img-responsive" />
                    </div>
                    <div className="col-sm-4 col-md-4">
                    </div>
                </div>
            </div>
        );
    }
}
