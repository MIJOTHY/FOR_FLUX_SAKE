"use strict";
import React, { Component, PropTypes } from "react";
import { clearFruities } from FruitActionCreators from "../actions/FruitActionCreators";

export default class FruitFooter extends Component {
	render() {
		return (
			<div className="options-item">
		    <button onClick={clearFruities} className="clear"><img id="restart" src="assets/img/glyphicon-restart.png" /></button>
		    <button className="clear" id="wtf"><img src="assets/img/flux_logo_fandc_black.png" id="fluxy" /> </button>
   		</div>
		);
	}
};

