var React = require("react");

var FruitListItem = React.createClass({

	plusHandler: function(e) {
		e.preventDefault();
		this.props.incrementQuantity(this.props.id);
	},

	minusHandler: function(e) {
		e.preventDefault();
		this.props.decrementQuantity(this.props.id);
	},

	render: function() {
		return (
			<div className="fruit-item">
			    <button className="minus" onClick={this.minusHandler}>-</button>
			    {this.props.fruit}
			    <button className="plus" onClick={this.plusHandler}>+</button>
			    <span className="list-number">{this.props.quantity}</span>
			</div>
		);
	}

});

module.exports = FruitListItem;