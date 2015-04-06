var React 		= require("react");
var FruitHeader = require("./FruitHeader");
var FruitList 	= require("./FruitList");
var FruitFooter = require("./FruitFooter");
var FruitStore 	= require("../stores/FruitStore");

/* NEW STUFF */
// Instead of getting our state from the data we had sat here in a variable, we now instead have to ask our store for data
function getStateFromStore() {
	return {
		headerText: FruitStore.getText(),
		fruities: FruitStore.getFruities()
	};
} 

var FruitApp = React.createClass({
	
	getInitialState: function() {
		return getStateFromStore();
	},
// When the component mounts into the page, we want to start listening for change events from the store. 
	componentDidMount: function() {
		FruitStore.addChangeListener(this._onChange);
	},
// If the component dismounts from the page, we want to stop listening for change events from the store. 
	componentWillUnmount: function() {
		FruitStore.removeChangeListener(this._onChange);
	},
// Whenever we hear a change event from the store, we're going to want to ask the store for the new data, and then set our state accordingly
	_onChange: function() {
		this.setState(getStateFromStore());
	},
/* END NEW STUFF */
// Note how 'clearFruities' is no longer present
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
// We no longer need to pass a callback down to the footer, as our footer just uses the dispatcher to dispatch an action to our FruitStore
	render: function() {
		return (
			<div className="app-wrapper">
				<FruitHeader title={this.state.headerText} addFruit={this.addFruit} changeText={this.changeText} />
				<FruitList fruities={this.state.fruities} filterText={this.state.headerText} incrementQuantity={this.incrementQuantity} decrementQuantity={this.decrementQuantity}/>
				<FruitFooter />
			</div>
		);
	}
});

module.exports = FruitApp;