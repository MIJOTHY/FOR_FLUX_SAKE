"use strict";
import React, { Component, PropTypes } from "react";
import FruitListItem from "./FruitListItem";

export default class FruitList extends Component {
	render() {
		let fruititems = [];
		this.props.fruities.forEach(fruit => {
			if (this.props.filterText.includes(fruit.fruit)) {
				fruititems.push(
					<FruitListItem
							key={fruit.id}
							id={fruit.id}
							fruit={fruit.fruit}
							quantity={fruit.quantity}
					/>
				);
			}
		});

		return (
			<div className="fruit-list">
				{fruititems}
			</div>
			);
	}
};

FruitList.propTypes = {
	filterText: PropTypes.string,
	fruities: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			fruit: PropTypes.string,
			quantity: PropTypes.number
		}))
}