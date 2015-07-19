var React       = require("react");
var FruitHeader = require("./FruitHeader");
var FruitList 	= require("./FruitList");
var FruitFooter = require("./FruitFooter");
var FruitStore 	= require("../stores/FruitStore");
var connectToStores = require("../utils/connectToStores");
var FruitActionCreators = require("../actions/FruitActionCreators");

var PropTypes = React.PropTypes;

function getStateFromStores() {
	return {
		headerText: FruitStore.getText(),
		fruities: FruitStore.getFruities()
	};
}

var FruitApp = React.createClass({

	propTypes: {
		headerText: PropTypes.string,
		fruities: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string,
			fruit: PropTypes.string,
			quantity: PropTypes.number
		}))
	},

	render: function() {
		return (
			<div className="app-wrapper">
				<FruitHeader title={this.props.headerText} addFruit={FruitActionCreators.addFruit} />
				<FruitList fruities={this.props.fruities} filterText={this.props.headerText}/>
				<FruitFooter/>
			</div>
		);
	}
});

module.exports = connectToStores([FruitStore], getStateFromStores)(FruitApp);