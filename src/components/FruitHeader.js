var React = require("react");

var FruitHeader = React.createClass({

	textChangeHandler: function(e) {
		e.preventDefault();
		this.props.changeText(e.target.value);
	},

	submitHandler: function(e) {
		e.preventDefault();
		this.props.addFruit(this.props.title);
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