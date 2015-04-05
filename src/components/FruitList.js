var React 		  = require("react");
var FruitListItem = require("./FruitListItem");

var FruitList = React.createClass({
	
	render: function() {
		var fruititems = [];

		this.props.fruities.forEach(function(fruit) {
			if (fruit.fruit.indexOf(this.props.filterText) !== -1)
			fruititems.push(
				<FruitListItem key={fruit.id} id={fruit.id} fruit={fruit.fruit} quantity={fruit.quantity} incrementQuantity={this.props.incrementQuantity} decrementQuantity={this.props.decrementQuantity}/>
			);
		}, this);

		return (
			<div className="fruit-list">
				{fruititems}
			</div>
			);
	}

});

module.exports = FruitList;