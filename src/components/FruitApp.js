"use strict";
import React, { Component, PropTypes } from "react";
import FruitHeader from "./FruitHeader";
import FruitList from "./FruitList";
import FruitFooter from "./FruitFooter";
import FruitStore from "../stores/FruitStore";
import connectToStores from "../utils/connectToStores";

function getStateFromStores() {
	return {
		headerText: FruitStore.getText(),
		fruities: FruitStore.getFruities()
	};
}

class FruitApp extends Component {
	render() {
		return (
			<div className="app-wrapper">
				<FruitHeader title={this.props.headerText} />
				<FruitList fruities={this.props.fruities} filterText={this.props.headerText}/>
				<FruitFooter/>
			</div>
		);
	}
};

FruitApp.PropTypes = {
	headerText: PropTypes.string,
	fruities: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			fruit: PropTypes.string,
			quantity: PropTypes.number
		})
	)
}

export default connectToStores([FruitStore], getStateFromStores)(FruitApp);