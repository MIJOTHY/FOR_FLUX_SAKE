"use strict";
import React, { Component, PropTypes } from "react";
import { changeText, addFruit } from FruitActions from "../actions/FruitActionCreators";

export default class FruitHeader extends Component {

	textChangeHandler(e) {
		e.preventDefault();
		changeText(e.target.value);
	},

	submitHandler(e) {
		e.preventDefault();
		addFruit(this.props.title);
	},

	render() {
		return (
			<form onSubmit={this.submitHandler} className="fruit-header">
		    <input value={this.props.title} onChange={this.textChangeHandler} className="searchbar" type="text" placeholder="5-a-day tracker"/>
		    <button onClick={this.submitHandler} className="plus"><img src="assets/img/glyphicon-leaf.png" /></button>
			</form>
		);
	}
};

FruitHeader.propTypes = {
	title: PropTypes.string
};