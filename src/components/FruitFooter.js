var React 		 = require("react");
var FruitActions = require("../actions/FruitActionCreators");

var FruitFooter  = React.createClass({

	clickHandler: function(e) {
		e.preventDefault();
		FruitActions.clearFruities();
	},

	render: function() {
		return (
			<div className="options-item">
			    <button onClick={this.clickHandler} className="clear"><img id="restart" src="assets/img/glyphicon-restart.png" /></button>
			    <button className="clear" id="wtf"><img src="assets/img/flux_logo_fandc_black.png" id="fluxy" /> </button>
      </div>
		);
	}

});

module.exports = FruitFooter;
