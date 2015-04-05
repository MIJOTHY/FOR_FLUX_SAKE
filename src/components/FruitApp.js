var React 		= require("react");
var FruitHeader = require("./FruitHeader");
var FruitList 	= require("./FruitList");
var FruitFooter = require("./FruitFooter");

function getStateFromData() {
	return {
		headerText: "",
		fruities: [
			{ id: "123456", fruit: "Chicken", quantity:6 },
			{ id: "123467", fruit: "Apples" , quantity:2 },
			{ id: "123478", fruit: "Oranges", quantity:4 },
			{ id: "123489", fruit: "Peaches", quantity:1 },
		]
	};
} 

var FruitApp = React.createClass({
	
	getInitialState: function() {
		return getStateFromData();
	},

	addFruit: function(name) {
		if (name === "") return;
		var newFruities = this.state.fruities;
		var timestamp = Date.now().toString();
		var freshFruit = {
			id: timestamp.slice(timestamp.length-6),
			fruit: name,
			quantity: 1
		};
		newFruities.push(freshFruit);
		return this.setState({headerText: "", fruities: newFruities});	
	},

	changeText: function(text) {
		return this.setState({headerText: text});
	},

	decrementQuantity: function(id) {
		var newFruities = [];
		this.state.fruities.forEach(function(ele) {
			if (ele.id === id) {
				if (ele.quantity === 0) return;
				ele.quantity -= 1;
			}
			return newFruities.push(ele);
		});
		return this.setState({fruities: newFruities});
	},

	incrementQuantity: function(id) {
		var newFruities = [];
		this.state.fruities.forEach(function(ele) {
			if (ele.id === id) ele.quantity += 1;
			return newFruities.push(ele);
		});
		return this.setState({fruities: newFruities});
	},

	clearFruities: function() {
		return this.setState({fruities: []});
	},

	render: function() {
		return (
			<div className="app-wrapper">
				<FruitHeader title={this.state.headerText} addFruit={this.addFruit} changeText={this.changeText} />
				<FruitList fruities={this.state.fruities} filterText={this.state.headerText} incrementQuantity={this.incrementQuantity} decrementQuantity={this.decrementQuantity}/>
				<FruitFooter clearFruities={this.clearFruities} />
			</div>
		);
	}
});

module.exports = FruitApp;