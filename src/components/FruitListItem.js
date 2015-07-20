"use strict";
import React, { Component, PropTypes } from "react";
import { incrementQuantity, decrementQuantity } from FruitActions from "../actions/FruitActionCreators";

export default class FruitListItem extends Component {

	render() {

		return (
			<div className="fruit-item">
		    <button className="minus" onClick={incrementQuantity.bind(null, this.props.id)}>-</button>
		    {this.props.fruit}
		    <button className="plus" onClick={incrementQuantity.bind(null, this.props.id)}>+</button>
		    <span className="list-number">{this.props.quantity}</span>
			</div>
		);
	}

};

FruitListItem.propTypes = {
	id: PropTypes.string,
	fruit: PropTypes.string,
	quantity: PropTypes.number
};