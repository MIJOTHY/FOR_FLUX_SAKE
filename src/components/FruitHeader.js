var React 			= require("react");
var FruitActions 	= require("../actions/FruitActionCreators");

var FruitHeader = React.createClass({

	textChangeHandler: function(e) {
		e.preventDefault();
		FruitActions.changeText(e.target.value);
	},

	submitHandler: function(e) {
		e.preventDefault();
		FruitActions.addFruit(this.props.title);
	},

	render: function() {
		return (
			<form onSubmit={this.submitHandler} className="fruit-header">
			    <input value={this.props.title} onChange={this.textChangeHandler} className="searchbar" type="text" placeholder="5-a-day tracker"/>
			    <button onClick={this.submitHandler} className="plus"><img src="assets/img/glyphicon-leaf.png" /></button>
			</form>
		);
	}
});

module.exports = FruitHeader;