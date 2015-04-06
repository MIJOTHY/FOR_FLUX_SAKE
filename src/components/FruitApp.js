var React 		= require("react");
var FruitHeader = require("./FruitHeader");
var FruitList 	= require("./FruitList");
var FruitFooter = require("./FruitFooter");
var FruitStore 	= require("../stores/FruitStore");

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

	componentDidMount: function() {
		FruitStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		FruitStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getStateFromStore());
	},

	render: function() {
		return (
			<div className="app-wrapper">
				<FruitHeader title={this.state.headerText} addFruit={this.addFruit} />
				<FruitList fruities={this.state.fruities} filterText={this.state.headerText}/>
				<FruitFooter/>
			</div>
		);
	}
});

module.exports = FruitApp;