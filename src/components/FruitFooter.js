var React = require("react");
var FruitDispatcher = require("../dispatcher/FruitDispatcher");

var FruitFooter = React.createClass({
	// Instead of using the clearFruities callback that FruitApp used to give us, we now use the dispatcher to send off an action with a particular type
	// This is picked up by the FruitStore
	clickHandler: function(e) {
		e.preventDefault();
		FruitDispatcher.dispatch({
			type: "CLEAR_ALL_FRUITS"
		});
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
